import {List, Map, fromJS} from 'immutable'
import {handleAction, handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from 'reducers/utils'
import * as MapActions from 'actions/map'
import * as DrawerActions from 'actions/drawers'
import * as EntityActions from 'actions/entities'
import * as PrismicActions from 'actions/prismic'
import {getLayerIds} from 'constants/map/layers'
import {Transformers} from 'constants/map/sources'
import * as Layers from 'constants/drawers'
import featureFilter from 'feature-filter'
import MapLayers from 'constants/map/layers'
import MapSources from 'constants/map/sources'

export default combineReducers({
    command: handleAction(MapActions.MAP_COMMAND_CREATED, getPayload, null),
    style: handleActions({
        [MapActions.LOAD_MAP_STYLE_SUCCESS]: mergeStyle,
        [MapActions.LOAD_MAP_STYLE_FAILURE]: getPayload,
        [MapActions.CENTER_CHANGED]: setCenter,
        [MapActions.ZOOM_CHANGED]: setZoom,
        [DrawerActions.LAYER_TURNED_ON]: toggleLayersFactory(true),
        [DrawerActions.LAYER_TURNED_OFF]: toggleLayersFactory(false),
        [DrawerActions.FILTER_CHANGED]: setFilter,
        [EntityActions.WEATHER_STATIONS_SUCCESS]: setWeatherStations,
        [EntityActions.MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS]: setSubmissions,
        [PrismicActions.PRISMIC_SUCCESS]: setToyotaTruckReports,
    }, fromJS({
        sources: MapSources
    })),
})

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
        fromJS(features.filter(filter)),
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
                        style.setIn([...path, 1], fromJS(filter))
                    )
                }
                case 'days': {
                    return setFilteredSubmissions(
                        style.setIn([...path, 2], List.of('has', String(value)))
                    )
                }
            }
    }

    return style
}

function mergeStyle(style, {payload}) {
    return style.mergeDeep(payload)
                .update('layers', layers => layers.concat(fromJS(MapLayers)))
}
function setCenter(style, {payload}) {
    return style.set('center', payload)
}
function setZoom(style, {payload}) {
    return style.set('zoom', payload)
}
function toggleLayersFactory(visible) {
    visible = visible ? 'visible' : 'none'

    return (style, {payload}) => style.withMutations(style => {
        const layers = style.get('layers')

        getLayerIds(payload).forEach(id => {
            const index = layers.findIndex(layer => layer.get('id') === id)

            style.setIn(['layers', index, 'layout', 'visibility'], visible)
        })
    })
}
function featuresAsMap(features) {
    return features.reduce(
        (all, feature) => all.set(String(feature.properties.id), feature),
        new Map()
    )
}
function setWeatherStations(style, {payload, meta}) {
    const source = Layers.WEATHER_STATION
    const path = ['sources', source, 'data', 'features']
    const entities = payload.entities[meta.schema.getKey()]
    const stations = new Map(entities).map(Transformers.get(source))
    const features = featuresAsMap(style.getIn(path))

    return style.setIn(path, features.mergeDeep(stations).toList())
}
function setSubmissions(style, {payload, meta}) {
    if (!meta.params.days) {
        return style
    }

    const source = Layers.MOUNTAIN_INFORMATION_NETWORK
    const path = ['sources', `all-${source}`, 'data', 'features']
    const entities = payload.entities[meta.schema.getKey()]
    const transformer = Transformers.get(source)(meta.params.days)
    const submissions = new Map(entities).map(transformer)
    const features = featuresAsMap(style.getIn(path)).mergeDeep(submissions)

    return setFilteredSubmissions(style.setIn(path, features.toList()))
}
function setToyotaTruckReports(style, {payload, meta}) {
    if (meta.type !== 'toyota-truck-report') {
        return style
    }

    const source = Layers.TOYOTA_TRUCK_REPORTS
    const path = ['sources', source, 'data', 'features']

    // TODO: Remove that condition when prismic action dispatching reductions is implemented
    if (!style.getIn(path).isEmpty()) {
        return style
    }

    const reports = payload.results.map(Transformers.get(source))

    return style.setIn(path, fromJS(reports))
}
