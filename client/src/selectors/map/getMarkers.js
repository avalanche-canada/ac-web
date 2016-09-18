import {createSelector} from 'reselect'
import Immutable, {List} from 'immutable'
import mapbox from 'mapbox/map'
import {ForecastRegion, HotZoneArea, MountainInformationNetworkObservation} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getLayers} from 'reducers/drawers'
import {getCluster} from 'reducers/map'
import {getMountainInformationNetworkSubmissions} from './getSources'
import {near} from 'utils/geojson'
import turf from 'turf-helpers'
import place from 'components/icons/place.svg'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_INFORMATION_NETWORK,
} from 'constants/map/layers'
import './markers.css'

const {assign} = Object
const {LngLat} = mapbox
const EMPTY_LIST = new List()

function createLngLat(feature) {
    const centroid = feature.getIn(['properties', 'centroid']).toArray()

    return LngLat.convert(centroid)
}

function createElement({width = 50, height = 50, title, alt = title, ...rest}) {
    // FIXME: This will not work on the server
    const element = document.createElement('img')

    element.classList.add('map-marker')

    return assign(element, {
        width,
        height,
        alt,
        title,
        ...rest
    })
}

const FORECAST_REGION_KEY = ForecastRegion.getKey()
const HOT_ZONE_AREA_KEY = HotZoneArea.getKey()
const MOUNTAIN_INFORMATION_NETWORK_OBSERVATION_KEY = MountainInformationNetworkObservation.getKey()

function createForecastRegionMarker(region) {
    const dangerIconUrl = region.getIn(['properties', 'dangerIconUrl'])
    const id = region.get('id')

    return {
        id: `${FORECAST_REGION_KEY}:${id}`,
        location: {
            pathname: `/map/forecasts/${id}`,
        },
        element: createElement({
            src: dangerIconUrl,
            title: region.getIn(['properties', 'name']),
        }),
        lnglat: createLngLat(region),
        options: {
            offset: [-25, -25]
        },
    }
}

const POSITIONS = new Map([
    [2, new Map([
        [0, 'top: -15px;'],
        [1, 'top: 15px;'],
    ])],
    [3, new Map([
        [0, 'top: 15px; left: 15px;'],
        [1, 'top: 15px; left: 15px;'],
        [2, 'top: 15px; left: 15px;'],
    ])],
    [4, new Map([
        [0, 'top: 15px; left: 15px;'],
        [1, 'top: -15px; left: 15px;'],
        [2, 'top: -15px; left: -15px;'],
        [3, 'top: -15px; left: 15px;'],
    ])],
    [5, new Map([
        [0, 'top: 15px; left: 15px;'],
        [1, 'top: -15px; left: 15px;'],
        [2, 'top: -15px; left: -15px;'],
        [3, 'top: -15px; left: 15px;'],
        [4, 'top: 15px; left: -15px;'],
    ])],
    [6, new Map([
        [0, 'top: 15px; left: 15px;'],
        [1, 'top: -15px; left: 15px;'],
        [2, 'top: -15px; left: -15px;'],
        [3, 'top: -15px; left: 15px;'],
        [4, 'top: 15px; left: -15px;'],
        [5, 'top: 15px; left: -15px;'],
    ])],
])


function createMountainInformationNetworkObservationMarker({properties, geometry}, index, markers) {
    const {obid, obtype} = properties

    return {
        id: `${MOUNTAIN_INFORMATION_NETWORK_OBSERVATION_KEY}:${obid}`,
        location: {
            query: {
                panel: `${MOUNTAIN_INFORMATION_NETWORK_OBSERVATION_KEY}/${obid}`,
            },
        },
        element: createElement({
            src: place,
            title: obtype,
            style: POSITIONS.get(markers.size).get(index),
            width: 40,
            height: 40,
        }),
        lnglat: LngLat.convert(geometry.coordinates),
        options: {
            offset: [-25, -25]
        },
    }
}

const createForecastRegionMarkers = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    entities => entities.map(createForecastRegionMarker),
)

const createMountainInformationNetworkSubmissionMarkers = createSelector(
    getMountainInformationNetworkSubmissions,
    getCluster,
    (observations, cluster) => {
        if (!cluster) {
            return EMPTY_LIST
        }

        const {geometry, properties: {point_count}, layer: {source}} = cluster

        if (source !== MOUNTAIN_INFORMATION_NETWORK_OBSERVATION_KEY) {
            return EMPTY_LIST
        }

        const points = turf.featureCollection(observations)
        const features = near(geometry, points, point_count)

        return new List(features).map(createMountainInformationNetworkObservationMarker)
    }
)

const getMakers = createSelector(
    createForecastRegionMarkers,
    createMountainInformationNetworkSubmissionMarkers,
    (regions, submissions) => new Immutable.Map({
        [FORECASTS]: regions,
        [MOUNTAIN_INFORMATION_NETWORK]: submissions,
    })
)

export default createSelector(
    getMakers,
    getLayers,
    (markers, layers) => {
        return markers
                .filter((markers, type) => layers.has(type))
                .reduce((list, markers) => (
                    list.concat(markers.toList())
                ), EMPTY_LIST)
    }
)
