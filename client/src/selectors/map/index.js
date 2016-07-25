import {createSelector} from 'reselect'
import mapboxgl from 'mapboxgl'
import {getZoom, getCenter} from 'reducers/map'
import getSources from './getSources'
import getLayers from './getLayers'
import getMarkers from './getMarkers'
import {getEntityForSchema} from 'reducers/entities'
import {loadForecastRegions} from 'actions/entities'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import bbox from 'turf-bbox'

const {LngLatBounds} = mapboxgl

function createFeatureBounds(feature) {
    return {
        bbox: LngLatBounds.convert(bbox(feature.toJSON())),
        options: {
            offset: [-250, 0],
            padding: 25,
        }
    }
}

function getActiveFeature(state, {params, routes}) {
    const {name} = params

    if (routes.find(route => route.path === 'forecasts')) {
        return getEntityForSchema(state, ForecastRegion, name)
    } else if (routes.find(route => route.path === 'hot-zone-reports')) {
        return getEntityForSchema(state, HotZoneArea, name)
    }

    return null
}

const getBounds = createSelector(
    getActiveFeature,
    feature => feature ? createFeatureBounds(feature) : null
)

export const getMapProps = createSelector(
    getBounds,
    getZoom,
    getCenter,
    getSources,
    getLayers,
    getMarkers,
    function computeMapProps(bounds, zoom, center, sources, layers, markers) {
        return {
            state: {
                zoom,
                center,
                bounds,
            },
            sources,
            layers,
            markers,
        }
    }
)
