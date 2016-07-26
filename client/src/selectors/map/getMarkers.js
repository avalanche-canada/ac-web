import {createSelector} from 'reselect'
import {Map, List} from 'immutable'
import mapboxgl from 'mapboxgl'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getLayers} from 'reducers/drawers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
} from 'constants/map/layers'
import {history} from 'router'

const {assign} = Object
const {LngLat} = mapboxgl

function createElement({
    width = 50,
    height = 50,
    style = 'top: -25px; left: -25px; cursor: pointer;',
    title,
    alt = title,
    ...rest,
}) {
    const element = document.createElement('img')

    return assign(element, {width, height, style, alt, title, ...rest})
}
function createLngLat(feature) {
    const centroid = feature.getIn(['properties', 'centroid']).toArray()

    return LngLat.convert(centroid)
}

const FORECAST_REGION_KEY = ForecastRegion.getKey()
const HOT_ZONE_AREA_KEY = HotZoneArea.getKey()

function createForecastRegionMarker(region) {
    const dangerIconUrl = region.getIn(['properties', 'dangerIconUrl'])
    const id = region.get('id')

    return {
        id: `${FORECAST_REGION_KEY}:${id}`,
        element: createElement({
            src: `http://www.avalanche.ca/${dangerIconUrl}`,
            title: region.getIn(['properties', 'name']),
            onclick() {
                history.push(`/map/forecasts/${id}`)
            },
        }),
        lnglat: createLngLat(region),
    }
}

function createHotZoneAreaMarker(area) {
    const id = area.get('id')

    return {
        id: `${HOT_ZONE_AREA_KEY}:${id}`,
        element: createElement({
            src: 'http://www.avalanche.ca/api/hzr/inactive/icon.svg',
            title: area.getIn(['properties', 'name']),
            onclick() {
                history.push(`/map/hot-zone-reports/${id}`)
            },
        }),
        lnglat: createLngLat(area),
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

const getMakers = createSelector(
    createForecastRegionMarkers,
    createHotZoneAreaMarkers,
    (regions, areas) => new Map({
        [FORECASTS]: regions,
        [HOT_ZONE_REPORTS]: areas,
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
                ), new List())
    }
)
