import {createAction} from 'redux-actions'
import {getVisibleLayers} from 'getters/drawers'
import {loadForType} from 'actions/prismic'
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
        const layers = getVisibleLayers(getState())

        layers.forEach(layer => {
            const actions = createActionsForLayer(layer)

            actions.forEach(dispatch)
        })
    }
}

function createActionsForLayer(layer) {
    switch (layer.get('id')) {
        case FORECASTS:
            return [loadForecastRegions()]
        case HOT_ZONE_REPORTS:
            return [loadHotZoneAreas(), loadHotZoneReports()]
        case MOUNTAIN_INFORMATION_NETWORK:
            const value = layer.getIn(['filters', 'days', 'value'])

            return [loadMountainInformationNetworkSubmissionsForDays(value)]
        case TOYOTA_TRUCK_REPORTS:
            // TODO: Create an action for Toyota trucks only!
            // Called too much, should look if any exist first! 
            return [loadForType('toyota-truck-report')]
        case WEATHER_STATION:
            return [loadWeatherStations()]
        default:
            throw new Error(`Layer of type ${layer} is not handled by "createActionsForLayer".`)
    }
}
