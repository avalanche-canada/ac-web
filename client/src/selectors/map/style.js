import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {getStyle, getActiveFeatures} from 'getters/map'
import {getEntitiesForSchema} from 'getters/entities'
import {getResultsSet} from 'reducers/api/getters'
import {getDocumentsOfType} from 'getters/prismic'
import {getLayers, getLayerFilter} from 'getters/drawers'
import {ActiveLayerIds, LayerIds} from 'constants/map/layers'
import Parser, {parseLocation} from 'prismic/parser'
import {isHotZoneReportValid} from 'prismic/utils'
import * as Layers from 'constants/drawers'
import * as Schemas from 'api/schemas'
import turf from '@turf/helpers'

// Define transformers to transform entoty to feature
const TRANSFORMERS = new Map([
    [Layers.MOUNTAIN_INFORMATION_NETWORK, submission => {
        submission = submission.toJSON()
        const [lat, lng] = submission.latlng
        const types = submission.obs.map(ob => ob.obtype)

        return turf.point([lng, lat], {
            id: Schemas.MountainInformationNetworkSubmission.getId(submission),
            icon: types.includes('incident') ? 'min-pin-with-incident' : 'min-pin',
            title: submission.title,
            types,
        })
    }],
    [Layers.WEATHER_STATION, station => {
        station = station.toJSON()

        return turf.point([station.longitude, station.latitude], {
            title: station.name,
            id: Schemas.WeatherStation.getId(station),
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

// Create submissions source
const getSubmissions = createSelector(
    state => getEntitiesForSchema(state, Schemas.MountainInformationNetworkSubmission),
    state => getResultsSet(state, Schemas.MountainInformationNetworkSubmission, {
        days: getLayerFilter(state, Layers.MOUNTAIN_INFORMATION_NETWORK, 'days')
    }),
    (submissions, {ids}) => {
        const transformer = TRANSFORMERS.get(Layers.MOUNTAIN_INFORMATION_NETWORK)

        return Array.from(ids).map(id => transformer(submissions.get(id)))
    }
)

const getSubmissionFeatures = createSelector(
    getSubmissions,
    state => getLayerFilter(state, Layers.MOUNTAIN_INFORMATION_NETWORK, 'type'),
    (submissions, typeFilter) => {
        if (typeFilter.size === 0) {
            return submissions
        }

        function has(type) {
            return typeFilter.has(type)
        }

        return submissions.filter(
            submission => submission.properties.types.find(has)
        )
    }
)

// Create weather station source
const getWeatherStationFeatures = createSelector(
    state => getEntitiesForSchema(state, Schemas.WeatherStation),
    stations => {
        const transformer = TRANSFORMERS.get(Layers.WEATHER_STATION)

        return stations.map(transformer).toArray()
    }
)

// Create source for prismic
function getPrismicDocumentsFeaturesFactory(type, layer) {
    const transformer = TRANSFORMERS.get(layer)

    return createSelector(
        state => getDocumentsOfType(state, type),
        documents => documents.map(transformer).toArray()
    )
}

// All map sources
const getSourceFeatures = createSelector(
    getSubmissionFeatures,
    getWeatherStationFeatures,
    getPrismicDocumentsFeaturesFactory('toyota-truck-report', Layers.TOYOTA_TRUCK_REPORTS),
    getPrismicDocumentsFeaturesFactory('special-information', Layers.SPECIAL_INFORMATION),
    (submissions, stations, toyota, special) => new Map([
        [Layers.MOUNTAIN_INFORMATION_NETWORK, submissions],
        [Layers.WEATHER_STATION, stations],
        [Layers.TOYOTA_TRUCK_REPORTS, toyota],
        [Layers.SPECIAL_INFORMATION, special],
    ])
)

// Creating visibilities
const getLayersVisibilities = createSelector(
    state => getLayers(state),
    layers => layers.reduce((visibilities, {id, visible}) => {
        let visibility = visible ? 'visible' : 'none'

        return LayerIds.get(id).reduce(
            (visibilities, id) => visibilities.set(id, visibility),
            visibilities
        )
    }, new Map())
)

// Creating filters
const LayerToSchemaMapping = new Map([
    [Layers.FORECASTS, Schemas.ForecastRegion.key],
    [Layers.HOT_ZONE_REPORTS, Schemas.HotZone.key],
])

const getActiveFeatureFilters = createSelector(
    getActiveFeatures,
    features => {
        const filters = new Map()

        ActiveLayerIds.forEach((ids, layer) => ids.forEach(id => {
            const schema = LayerToSchemaMapping.get(layer)
            const filter = Immutable.List.of('==', 'id', '')

            if (features.has(schema)) {
                filters.set(id, filter.set(2, features.get(schema)))
            } else {
                filters.set(id, filter)
            }
        }))

        return filters
    }
)

const getHotZoneReports = createSelector(
    state => getDocumentsOfType(state, 'hotzone-report'),
    reports => reports.map(parse).filter(isHotZoneReportValid)
)

const getActiveHotZoneFilters = createSelector(
    getHotZoneReports,
    reports => {
        const ids = reports.map(report => report.region).toArray()

        return new Map([
            ['hot-zones', Immutable.List.of('!in', 'id', ...ids)],
            ['opened-hot-zones', Immutable.List.of('in', 'id', ...ids)],
        ])
    }
)

const getLayerFilters = createSelector(
    getActiveFeatureFilters,
    getActiveHotZoneFilters,
    (active, hzr) => new Map([...active, ...hzr])
)

function getLayerIndexFactory(style) {
    const ids = style.get('layers').map(layer => layer.get('id'))

    return id => ids.findIndex(value => value === id)
}

const parse = Parser.parse.bind(Parser)

export default createSelector(
    getStyle,
    getLayerFilters,
    getLayersVisibilities,
    getSourceFeatures,
    (style, filters, visibilities, features) => {
        if (!style || !Immutable.Iterable.isIterable(style) || !style.has('id')) {
            return null
        }

        const getLayerIndex = getLayerIndexFactory(style)

        return style.withMutations(style => {
            // Set filters
            filters.forEach((filter, layer) => {
                const path = ['layers', getLayerIndex(layer), 'filter']

                style.setIn(path, filter)
            })

            // Set source features
            features.forEach((features, name) => {
                style.setIn(['sources', name, 'data', 'features'], features)
            })

            // Set layer visibility
            visibilities.forEach((visibility, layer) => {
                const path = ['layers', getLayerIndex(layer), 'layout', 'visibility']

                style.setIn(path, visibility)
            })
        })
    }
)
