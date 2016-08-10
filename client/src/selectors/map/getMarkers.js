import {createSelector} from 'reselect'
import Immutable from 'immutable'
import mapboxgl from 'mapboxgl'
import {ForecastRegion, HotZoneArea, MountainInformationNetworkObservation} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getLayers} from 'reducers/drawers'
import {getCluster} from 'reducers/map'
import {getMountainInformationNetworkObservations} from './getSources'
import {near} from 'utils/geojson'
import turf from 'turf-helpers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_INFORMATION_NETWORK,
} from 'constants/map/layers'
import './markers.css'

const {assign} = Object
const {LngLat} = mapboxgl
const EMPTY_LIST = new Immutable.List()

function createElement({width = 50, height = 50, title, alt = title, ...rest}) {
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

function createLngLat(feature) {
    const centroid = feature.getIn(['properties', 'centroid']).toArray()

    return LngLat.convert(centroid)
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
            // TODO: Change to internal url
            src: `http://www.avalanche.ca/${dangerIconUrl}`,
            title: region.getIn(['properties', 'name']),
        }),
        lnglat: createLngLat(region),
        options: {
            // Option available in next mapbox-gl-js release
            offset: [-25, 25]
        },
    }
}

function createHotZoneAreaMarker(area) {
    const id = area.get('id')

    return {
        id: `${HOT_ZONE_AREA_KEY}:${id}`,
        location: {
            pathname: `/map/hot-zone-reports/${id}`,
        },
        element: createElement({
            // TODO: Change to internal url
            src: 'http://www.avalanche.ca/api/hzr/inactive/icon.svg',
            title: area.getIn(['properties', 'name']),
        }),
        lnglat: createLngLat(area),
        options: {
            // Available in next release
            offset: [-25, 25]
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
            // TODO: Change to internal url
            src: 'http://www.avalanche.ca/api/hzr/inactive/icon.svg',
            title: obtype,
            style: POSITIONS.get(markers.size).get(index),
        }),
        lnglat: LngLat.convert(geometry.coordinates),
        options: {
            // Available in next release
            offset: [-25, 25]
        },
    }
}

const createForecastRegionMarkers = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    entities => entities.map(createForecastRegionMarker),
)

const createHotZoneAreaMarkers = createSelector(
    state => getEntitiesForSchema(state, HotZoneArea),
    entities => entities.map(createHotZoneAreaMarker),
)

const createMountainInformationNetworkObservationMarkers = createSelector(
    getMountainInformationNetworkObservations,
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

        return Immutable.List.of(...features).map(createMountainInformationNetworkObservationMarker)
    }
)

const getMakers = createSelector(
    createForecastRegionMarkers,
    createHotZoneAreaMarkers,
    createMountainInformationNetworkObservationMarkers,
    (regions, areas, minObs) => new Immutable.Map({
        [FORECASTS]: regions,
        [HOT_ZONE_REPORTS]: areas,
        [MOUNTAIN_INFORMATION_NETWORK]: minObs,
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
