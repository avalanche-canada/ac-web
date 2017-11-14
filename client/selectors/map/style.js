import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getStyle, getActiveFeatures } from 'getters/map'
import { createGetEntitiesForSchema } from 'selectors/factories'
import { getResultsSet } from 'getters/api'
import { getDocumentsOfType } from 'getters/prismic'
import { getLayers, getLayerFilter } from 'getters/drawers'
import {
    ActiveLayerIds,
    InactiveLayerIds,
    LayerIds,
} from 'constants/map/layers'
import { parseLocation } from 'prismic/parsers'
import { parse } from 'prismic'
import { isSpecialInformationValid, isHotZoneReportValid } from 'prismic/utils'
import * as Layers from 'constants/drawers'
import * as Schemas from 'api/schemas'
import * as turf from '@turf/helpers'
import explode from '@turf/explode'

function transformSubmission(submission) {
    submission = submission.toJSON()
    const [lat, lng] = submission.latlng
    const types = submission.obs.map(ob => ob.obtype)

    return turf.point([lng, lat], {
        id: Schemas.MountainInformationNetworkSubmission.getId(submission),
        icon: types.includes('incident') ? 'min-pin-with-incident' : 'min-pin',
        title: submission.title,
        types,
    })
}

function transformStation(station) {
    station = station.toJSON()

    return turf.point([station.longitude, station.latitude], {
        title: station.name,
        id: Schemas.WeatherStation.getId(station),
    })
}

function transformTruckReport(report) {
    const { uid, data: { position, headline } } = parse(report)

    return turf.point([position.longitude, position.latitude], {
        title: headline,
        id: uid,
    })
}

function transformFatalAccident(accident) {
    const { uid, data: { location, title } } = parse(accident)

    return turf.point([location.longitude, location.latitude], {
        title,
        id: uid,
    })
}

function transformSpecialInformation(special) {
    const { uid, data: { headline, locations } } = special

    return turf.multiPoint(locations.map(parseLocation), {
        title: headline,
        id: uid,
    })
}

function transformMountainConditionsReport(report) {
    const { location, title, id } = report.toJSON()

    return turf.point(location, { title, id })
}

// Define transformers to transform entity to feature
const TRANSFORMERS = new Map([
    [Layers.MOUNTAIN_INFORMATION_NETWORK, transformSubmission],
    [Layers.WEATHER_STATION, transformStation],
    [Layers.TOYOTA_TRUCK_REPORTS, transformTruckReport],
    [Layers.FATAL_ACCIDENT, transformFatalAccident],
    [Layers.SPECIAL_INFORMATION, transformSpecialInformation],
    [Layers.MOUNTAIN_CONDITIONS_REPORTS, transformMountainConditionsReport],
])

// TODO: Rework that
function getPanelIdFactory() {
    return () => undefined
    // return (state, props) => {
    //     const { panel } = props.location.query
    //
    //     if (!panel) {
    //         return null
    //     }
    //
    //     const [key, id] = panel.split('/')
    //
    //     return schema.key === key ? id : undefined
    // }
}

// Create submissions source
const getSubmissions = createSelector(
    createGetEntitiesForSchema(Schemas.MountainInformationNetworkSubmission),
    state =>
        getResultsSet(state, Schemas.MountainInformationNetworkSubmission, {
            days: getLayerFilter(
                state,
                Layers.MOUNTAIN_INFORMATION_NETWORK,
                'days'
            ),
        }),
    (submissions, { ids }) =>
        Array.from(ids)
            .map(id => submissions.get(id))
            .filter(Boolean)
            .map(TRANSFORMERS.get(Layers.MOUNTAIN_INFORMATION_NETWORK))
)

const getSubmission = createSelector(
    createGetEntitiesForSchema(Schemas.MountainInformationNetworkSubmission),
    getPanelIdFactory(Schemas.MountainInformationNetworkSubmission),
    (submissions, id) => {
        if (submissions.has(id)) {
            const transformer = TRANSFORMERS.get(
                Layers.MOUNTAIN_INFORMATION_NETWORK
            )

            return transformer(submissions.get(id))
        }
    }
)

function prepareSubmissions(submissions, submission, typeFilter, filter) {
    submissions = submissions.filter(filter)

    if (typeFilter.size > 0) {
        const has = type => typeFilter.has(type)
        const filter = submission => submission.properties.types.find(has)

        submissions = submissions.filter(filter)
    }

    if (submission && filter(submission)) {
        const { id } = submission.properties
        const filter = submission => submission.properties.id === id

        // We are only adding "submission" once.
        // "submission" may be already in submissions!
        const has = submissions.some(filter)

        if (!has) {
            submissions.push(submission)
        }
    }

    return submissions
}

function getSubmissionsTypeFilter(state) {
    return getLayerFilter(state, Layers.MOUNTAIN_INFORMATION_NETWORK, 'type')
}

const getIncidentSubmissionFeatures = createSelector(
    getSubmissions,
    getSubmission,
    getSubmissionsTypeFilter,
    () => {
        function filter(type) {
            return type === 'incident'
        }

        return submission => submission.properties.types.some(filter)
    },
    prepareSubmissions
)

const getSubmissionFeatures = createSelector(
    getSubmissions,
    getSubmission,
    getSubmissionsTypeFilter,
    () => {
        function filter(type) {
            return type !== 'incident'
        }

        return submission => submission.properties.types.every(filter)
    },
    prepareSubmissions
)

// Create weather station source
const getWeatherStationFeatures = createSelector(
    createGetEntitiesForSchema(Schemas.WeatherStation),
    stations => stations.map(TRANSFORMERS.get(Layers.WEATHER_STATION)).toArray()
)

// Create mountain conditions reports source
const getMountainConditionsReports = createSelector(
    createGetEntitiesForSchema(Schemas.MountainConditionsReport),
    reports => {
        const transformer = TRANSFORMERS.get(Layers.MOUNTAIN_CONDITIONS_REPORTS)

        return reports.map(transformer).toArray()
    }
)

// Create Toyota Truck Report Features
const getToyotaTruckFeatures = createSelector(
    state => getDocumentsOfType(state, 'toyota-truck-report'),
    documents =>
        documents.map(TRANSFORMERS.get(Layers.TOYOTA_TRUCK_REPORTS)).toArray()
)

function pointReducer(points, feature) {
    // Explode because Mapbox does not cluster on MultiPoint geometries
    // https://github.com/mapbox/mapbox-gl-js/issues/4076
    return points.concat(explode(feature).features)
}

// Create Special Information Features
const getSpecialInformationFeatures = createSelector(
    state => getDocumentsOfType(state, 'special-information'),
    documents =>
        documents
            .toArray()
            .map(special => parse(special))
            .filter(isSpecialInformationValid)
            .map(TRANSFORMERS.get(Layers.SPECIAL_INFORMATION))
            .reduce(pointReducer, [])
)

// Create Fatal Accident Features
const getFatalAccidentFeatures = createSelector(
    state => getDocumentsOfType(state, 'fatal-accident'),
    documents =>
        documents.toArray().map(TRANSFORMERS.get(Layers.FATAL_ACCIDENT))
)

// All map sources
const getSourceFeatures = createSelector(
    getSubmissionFeatures,
    getIncidentSubmissionFeatures,
    getWeatherStationFeatures,
    getToyotaTruckFeatures,
    getSpecialInformationFeatures,
    getFatalAccidentFeatures,
    getMountainConditionsReports,
    (
        submissions,
        incidents,
        stations,
        toyota,
        special,
        fatalAccidents,
        mountainConditionsReports
    ) =>
        new Map([
            [Layers.MOUNTAIN_INFORMATION_NETWORK, submissions],
            [Layers.MOUNTAIN_INFORMATION_NETWORK_INCIDENTS, incidents],
            [Layers.WEATHER_STATION, stations],
            [Layers.TOYOTA_TRUCK_REPORTS, toyota],
            [Layers.SPECIAL_INFORMATION, special],
            [Layers.FATAL_ACCIDENT, fatalAccidents],
            [Layers.MOUNTAIN_CONDITIONS_REPORTS, mountainConditionsReports],
        ])
)

// Creating visibilities
const getLayersVisibilities = createSelector(
    state => getLayers(state),
    layers =>
        layers.reduce((visibilities, { id, visible }) => {
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

const getActiveFeatureFilters = createSelector(getActiveFeatures, features => {
    const filterIn = Immutable.List.of('==', 'id', '')
    const filterOut = Immutable.List.of('!=', 'id', '')
    const filters = new Map()

    Array.from(LayerIds.keys()).forEach(layer => {
        if (!ActiveLayerIds.has(layer)) {
            return
        }

        const activeIds = ActiveLayerIds.get(layer)
        const inactiveIds = InactiveLayerIds.get(layer)
        const schema = LayerToSchemaMapping.get(layer)

        activeIds.forEach(id => {
            if (features.has(schema)) {
                filters.set(id, filterIn.set(2, features.get(schema)))
            } else {
                filters.set(id, filterIn)
            }
        })

        inactiveIds.forEach(id => {
            if (features.has(schema)) {
                filters.set(id, filterOut.set(2, features.get(schema)))
            } else {
                filters.set(id, filterOut)
            }
        })
    })

    return filters
})

const getHotZoneReports = createSelector(
    state => getDocumentsOfType(state, 'hotzone-report'),
    reports => reports.map(report => parse(report)).filter(isHotZoneReportValid)
)

const getActiveHotZoneFilters = createSelector(getHotZoneReports, reports => {
    const ids = reports.map(report => report.region).toArray()

    return new Map([
        ['hot-zones', Immutable.List.of('!in', 'id', ...ids)],
        ['opened-hot-zones', Immutable.List.of('in', 'id', ...ids)],
    ])
})

const getLayerFilters = createSelector(
    getActiveFeatureFilters,
    getActiveHotZoneFilters,
    (active, hzr) => new Map([...active, ...hzr])
)

function getLayerIndexFactory(style) {
    const ids = style.get('layers').map(layer => layer.get('id'))

    return id => ids.findIndex(value => value === id)
}

export default createSelector(
    getStyle,
    getLayerFilters,
    getLayersVisibilities,
    getSourceFeatures,
    (style, filters, visibilities, features) => {
        if (
            !style ||
            !Immutable.Iterable.isIterable(style) ||
            !style.has('id')
        ) {
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
                const path = [
                    'layers',
                    getLayerIndex(layer),
                    'layout',
                    'visibility',
                ]

                style.setIn(path, visibility)
            })
        })
    }
)
