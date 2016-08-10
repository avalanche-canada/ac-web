import {createSelector} from 'reselect'
import mapboxgl from 'mapboxgl'
import {getZoom, getCenter} from 'reducers/map'
import getSources from './getSources'
import getLayers from './getLayers'
import getMarkers from './getMarkers'
import getEvents from './getEvents'
import {getPreviousLocation} from 'reducers'
import {getEntityForSchema} from 'reducers/api/entities'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getPrimary, getSecondary} from 'selectors/drawers'
import bbox from 'turf-bbox'

const {LngLatBounds} = mapboxgl

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
    getPrimary,
    getSecondary,
    (feature, primary, secondary) => {
        if (!feature) {
            return null
        }
        let x = 0

        if (primary.open) {
            x -= primary.width / 2
        }
        if (secondary.open) {
            x += secondary.width / 2
        }

        return {
            bbox: LngLatBounds.convert(bbox(feature.toJSON())),
            options: {
                offset: [x, 0],
                padding: 25,
            }
        }
    }
)

export default createSelector(
    getBounds,
    getZoom,
    getCenter,
    getSources,
    getLayers,
    getMarkers,
    getEvents,
    function computeMapProps(bounds, zoom, center, sources, layers, markers, events) {
        return {
            zoom,
            center,
            bounds,
            ...events,
            sources,
            layers,
            markers,
        }
    }
)
