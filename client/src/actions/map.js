import {createAction} from 'redux-actions'
import {getMenu} from 'getters/drawers'
import {
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_INFORMATION_NETWORK,
    WEATHER_STATION,
    TOYOTA_TRUCK_REPORTS,
} from 'constants/map/layers'
import {
    loadHotZoneReports,
    loadForecastRegions,
    loadHotZoneAreas,
    loadMountainInformationNetworkSubmissionsForDays,
    loadWeatherStations,
} from 'actions/entities'
import {loadForType} from 'actions/prismic'

export const ZOOM_CHANGED = 'ZOOM_CHANGED'
export const CENTER_CHANGED = 'CENTER_CHANGED'
export const LOAD_STATE_CHANGED = 'LOAD_STATE_CHANGED'
export const MAP_COMMAND_CREATED = 'MAP_COMMAND_CREATED'

export const zoomChanged = createAction(ZOOM_CHANGED)
export const centerChanged = createAction(CENTER_CHANGED)
export const loadStateChanged = createAction(LOAD_STATE_CHANGED)

function createMapCommand(name) {
    return createAction(
        MAP_COMMAND_CREATED,
        (...args) => ({name, args})
    )
}

export const zoomIn = createMapCommand('zoomIn')
export const zoomOut = createMapCommand('zoomOut')
export const fitBounds = createMapCommand('fitBounds')
export const flyTo = createMapCommand('flyTo')

export function loadData() {
    return (dispatch, getState) => {
        const state = getState()
        const {layers, filters} = getMenu(state)

        layers.forEach(layer => {
            const actions = createActionsForLayer(layer, filters.get(layer))

            actions.forEach(dispatch)
        })
    }
}

function createActionsForLayer(layer, filters) {
    switch (layer) {
        case FORECASTS:
            return [loadForecastRegions()]
        case HOT_ZONE_REPORTS:
            return [loadHotZoneAreas(), loadHotZoneReports()]
        case MOUNTAIN_INFORMATION_NETWORK:
            const {value} = filters.get('days')

            return [loadMountainInformationNetworkSubmissionsForDays(value)]
        case TOYOTA_TRUCK_REPORTS:
            return [loadForType('toyota-truck-report')]
        // case MOUNTAIN_CONDITION_REPORTS:
        // case METEOGRAMS:
        // case SURFACE_HOAR:
        // case WEATHER_STATION:
        case WEATHER_STATION:
            return [loadWeatherStations()]
        default:
            throw new Error(`Layer of type ${layer} is not handled by "createActionsForLayer".`)
    }
}
