import {createAction} from 'redux-actions'
import {getMenu} from 'reducers/drawers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_CONDITION_REPORTS,
    METEOGRAMS,
    MOUNTAIN_INFORMATION_NETWORK,
    SURFACE_HOAR,
    WEATHER_STATION,
} from 'constants/map/layers'
import {
    loadForecastRegions,
    loadHotZoneAreas,
    loadMountainInformationNetworkObservationsForDays,
} from 'actions/entities'

export const ZOOM_CHANGED = 'ZOOM_CHANGED'
export const CENTER_CHANGED = 'CENTER_CHANGED'
export const CLUSTER_ACTIVATED = 'CLUSTER_ACTIVATED'
export const CLUSTER_DEACTIVATED = 'CLUSTER_DEACTIVATED'

export const zoomChanged = createAction(ZOOM_CHANGED)
export const centerChanged = createAction(CENTER_CHANGED)
export const activateCluster = createAction(CLUSTER_ACTIVATED)
export const deactivateCluster = createAction(CLUSTER_DEACTIVATED)

export function loadData() {
    return (dispatch, getState) => {
        const state = getState()
        const {layers, filters} = getMenu(state)

        layers.forEach(layer => {
            dispatch(loadForLayer(layer, filters.get(layer)))
        })
    }
}

function loadForLayer(layer, filters) {
    switch (layer) {
        case FORECASTS:
            return loadForecastRegions()
        case HOT_ZONE_REPORTS:
            return loadHotZoneAreas()
        case MOUNTAIN_INFORMATION_NETWORK:
            const {value} = filters.get('days')

            return loadMountainInformationNetworkObservationsForDays(value)
        // case MOUNTAIN_CONDITION_REPORTS:
        // case METEOGRAMS:
        // case SURFACE_HOAR:
        // case WEATHER_STATION:
        default:
            throw new Error(`Layer of type ${layer} is not handled by "loadForLayer".`)
    }
}
