import Immutable from 'immutable'
import {handleAction, handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from 'reducers/utils'
import * as MapActions from 'actions/map'
import * as DrawerActions from 'actions/drawers'
import * as EntityActions from 'actions/entities'
import * as PrismicActions from 'actions/prismic'
import MapLayers, {LayerIds} from 'constants/map/layers'
import * as Layers from 'constants/drawers'
import * as Schemas from 'api/schemas'
import featureFilter from 'feature-filter'
import MapSources from 'constants/map/sources'
import Parser, {parseLocation} from 'prismic/parser'
import turf from '@turf/helpers'

// TODO: Organize this code

export default combineReducers({
    command: handleAction(MapActions.MAP_COMMAND_CREATED, getPayload, null),
    style: handleActions({
        [MapActions.LOAD_MAP_STYLE_SUCCESS]: mergeStyle,
        [MapActions.LOAD_MAP_STYLE_FAILURE]: getPayload,
        [DrawerActions.LAYER_TURNED_ON]: toggleLayersFactory(true),
        [DrawerActions.LAYER_TURNED_OFF]: toggleLayersFactory(false),
        [DrawerActions.FILTER_CHANGED]: setFilter,
        [EntityActions.WEATHER_STATIONS_SUCCESS]: setWeatherStations,
        [EntityActions.MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS]: setSubmissions,
        [PrismicActions.PRISMIC_SUCCESS]: setPrismicDocuments,
    }, Immutable.fromJS({
        sources: MapSources,
        layers: MapLayers,
    })),
    activeFeatures: handleAction(
        MapActions.ACTIVE_FEATURES_CHANGED,
        setActiveFeatures,
        new Immutable.Map()
    ),
    width: handleAction(
        MapActions.MAP_WIDTH_CHANGED,
        getPayload,
        window.innerWidth
    ),
})

function transformePrismicReport(document) {
    const report = Parser.parse(document)
    const {uid, position: {longitude, latitude}, headline} = report

    return turf.point([longitude, latitude], {
        title: headline,
        id: uid,
    })
}

const Transformers = new Map([
    [Layers.MOUNTAIN_INFORMATION_NETWORK, days => submission => {
        const [lat, lng] = submission.latlng
        const types = submission.obs.map(ob => ob.obtype)

        return turf.point([lng, lat], {
            id: submission.subid,
            ...types.reduce((types, type) => ({...types, [type]: true}), {}),
            [String(days)]: true,
            icon: types.includes('incident') ? 'min-pin-with-incident' : 'min-pin',
            title: submission.title,
        })
    }],
    [Layers.WEATHER_STATION, station => {
        return turf.point([station.longitude, station.latitude], {
            title: station.name,
            id: station.stationId,
        })
    }],
    [Layers.TOYOTA_TRUCK_REPORTS, document => {
        const {uid, position, headline} = Parser.parse(document)

        return turf.point([position.longitude, position.latitude], {
            title: headline,
            id: uid,
        })
    }],
    [Layers.SPECIAL_INFORMATION, document => {
        const {uid, headline, locations} = Parser.parse(document)

        return turf.multiPoint(locations.map(parseLocation), {
            title: headline,
            id: uid,
        })
    }],
])


// It is currently impossible to apply filtering on preclustered features.
// There are few workarounds I have implemented to solve that limitation.
// A source "all-MOUNTAIN_INFORMATION_NETWORK" have been created to hold all
// MIN submissions. Then filter is applied to that source and set to the
// MOUNTAIN_INFORMATION_NETWORK source. Filter is stored in layer
// MOUNTAIN_INFORMATION_NETWORK.metadata.cluster-prefilter
// TODO: Remove these workarounds when
// https://github.com/mapbox/mapbox-gl-js/issues/2613 gets resolved
//  - Remove function setFilteredSubmissions
//  - Remove metadata.cluster-prefilter
//  - Remove "all-MOUNTAIN_INFORMATION_NETWORK" source
function setFilteredSubmissions(style) {
    const source = Layers.MOUNTAIN_INFORMATION_NETWORK
    const path = ['sources', `all-${source}`, 'data', 'features']
    const index = style.get('layers').findIndex(layer => layer.get('id') === source)
    let filter = style.getIn(['layers', index, 'metadata', 'cluster-prefilter'])
    const features = style.getIn(path).toJSON()

    filter = featureFilter(filter.toJSON())

    return style.setIn(
        ['sources', source, 'data', 'features'],
        Immutable.fromJS(features.filter(filter)),
    )
}
function setFilter(style, {payload: {layer, name, value}}) {
    switch (layer) {
        case Layers.MOUNTAIN_INFORMATION_NETWORK:
            const index = style.get('layers').findIndex(l => l.get('id') === layer)
            const path = ['layers', index, 'metadata', 'cluster-prefilter']

            switch (name) {
                case 'type': {
                    const filter = value.size === 0 ?
                        ['any',
                            ['has', 'quick'],
                            ['has', 'avalanche'],
                            ['has', 'snowpack'],
                            ['has', 'weather'],
                            ['has', 'incident'],
                        ] :
                        ['all',
                            ...Array.from(value).map(type => ['has', type])
                        ]

                    return setFilteredSubmissions(
                        style.setIn([...path, 1], Immutable.fromJS(filter))
                    )
                }
                case 'days': {
                    return setFilteredSubmissions(
                        style.setIn([...path, 2], Immutable.List.of('has', String(value)))
                    )
                }
            }
    }

    return style
}

function mergeStyle(style, {payload}) {
    // mergeDeep does not deal well with arrays, we are helping it here!
    // it merges using index and will overides existing layers
    payload.layers = payload.layers.concat(style.get('layers').toJSON())

    return style.delete('layers').mergeDeep(payload)
}
function toggleLayersFactory(visible) {
    visible = visible ? 'visible' : 'none'

    return (style, {payload}) => style.withMutations(style => {
        const layers = style.get('layers')

        LayerIds.get(payload).forEach(id => {
            const index = layers.findIndex(layer => layer.get('id') === id)

            style.setIn(['layers', index, 'layout', 'visibility'], visible)
        })
    })
}
function featuresAsMap(features) {
    return features.reduce(
        (all, feature) => all.set(String(feature.properties.id), feature),
        new Immutable.Map()
    )
}
function setWeatherStations(style, {payload, meta}) {
    const source = Layers.WEATHER_STATION
    const path = ['sources', source, 'data', 'features']
    const entities = payload.entities[meta.schema.key]
    const stations = new Immutable.Map(entities).map(Transformers.get(source))
    const features = featuresAsMap(style.getIn(path))

    return style.setIn(path, features.mergeDeep(stations).toList())
}
function setSubmissions(style, {payload, meta}) {
    if (!meta.params.days) {
        return style
    }

    const source = Layers.MOUNTAIN_INFORMATION_NETWORK
    const path = ['sources', `all-${source}`, 'data', 'features']
    const entities = payload.entities[meta.schema.key]
    const transformer = Transformers.get(source)(meta.params.days)
    const submissions = new Immutable.Map(entities).map(transformer)
    const features = featuresAsMap(style.getIn(path)).mergeDeep(submissions)

    return setFilteredSubmissions(style.setIn(path, features.toList()))
}

const PrismicTypeToSource = new Map([
    ['toyota-truck-report', Layers.TOYOTA_TRUCK_REPORTS],
    ['special-information', Layers.SPECIAL_INFORMATION],
])

function setPrismicDocuments(style, {payload, meta}) {
    if (!PrismicTypeToSource.has(meta.type)) {
        return style
    }

    const source = PrismicTypeToSource.get(meta.type)
    const path = ['sources', source, 'data', 'features']

    // TODO: Remove that condition when prismic action dispatching reductions is implemented
    if (!style.getIn(path).isEmpty()) {
        return style
    }

    const documents = payload.results.map(Transformers.get(source))

    return style.setIn(path, Immutable.fromJS(documents))
}

// Active features
function setActiveFeatures(features, {payload}) {
    payload = new Immutable.Map(Array.from(payload))

    if (features.equals(payload)) {
        return features
    } else {
        return payload
    }
}
