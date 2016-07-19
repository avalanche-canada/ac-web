import {createSelector} from 'reselect'
import {getZoom, getCenter} from 'reducers/map'
import getSources from './getSources'
import getLayers from './getLayers'
import getMarkers from './getMarkers'
import {getEntityForSchema} from 'reducers/entities'
import {loadForecastRegions} from 'actions/entities'
import {ForecastRegion} from 'api/schemas'
import bbox from 'turf-bbox'

function createFeatureBounds(feature) {
    return {
        bbox: bbox(feature.toJSON()),
        options: {
            offset: [-250, 0],
            padding: 25,
        }
    }
}


function getActiveFeature(state, {params}) {
    const {name} = params

    return getEntityForSchema(state, ForecastRegion, name)
}

const getBounds = createSelector(
    getActiveFeature,
    (region, hotZoneArea) => {
        if (region) {
            return createFeatureBounds(region)
        } else {
            return null
        }
    }
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
