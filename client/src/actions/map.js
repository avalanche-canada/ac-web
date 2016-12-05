import {createAction} from 'redux-actions'
import {getVisibleLayers} from 'getters/drawers'
import {getStyle} from 'getters/map'
import {loadForType} from 'actions/prismic'
import {fetchMapStyle} from 'services/mapbox/api'
import MapLayers from 'constants/map/layers'
import MapSources from 'constants/map/sources'
import {
    HOT_ZONE_REPORTS,
    MOUNTAIN_INFORMATION_NETWORK,
    WEATHER_STATION,
    TOYOTA_TRUCK_REPORTS,
} from 'constants/drawers'
import {
    loadFeaturesMetadata,
    loadHotZoneReports,
    loadMountainInformationNetworkSubmissionsForDays,
    loadWeatherStations,
} from 'actions/entities'

export const ZOOM_CHANGED = 'ZOOM_CHANGED'
export const CENTER_CHANGED = 'CENTER_CHANGED'
export const MAP_COMMAND_CREATED = 'MAP_COMMAND_CREATED'
export const LOAD_MAP_STYLE_SUCCESS = 'LOAD_MAP_STYLE_SUCCESS'
export const LOAD_MAP_STYLE_FAILURE = 'LOAD_MAP_STYLE_FAILURE'

export const zoomChanged = createAction(ZOOM_CHANGED)
export const centerChanged = createAction(CENTER_CHANGED)

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

        dispatch(loadFeaturesMetadata())

        layers.map(createActionForLayer).filter(Boolean).forEach(dispatch)
    }
}

function createActionForLayer(layer) {
    switch (layer.get('id')) {
        case HOT_ZONE_REPORTS:
            return loadHotZoneReports()
        case MOUNTAIN_INFORMATION_NETWORK:
            const value = layer.getIn(['filters', 'days', 'value'])

            return loadMountainInformationNetworkSubmissionsForDays(value)
        case TOYOTA_TRUCK_REPORTS:
            // TODO: Create an action for Toyota trucks only!
            // Called too much, should look if any exist first!
            return loadForType('toyota-truck-report')
        case WEATHER_STATION:
            return loadWeatherStations()
    }
}

const loadMapStyleSuccess = createAction(LOAD_MAP_STYLE_SUCCESS)
const loadMapStyleFailure = createAction(LOAD_MAP_STYLE_FAILURE)

export function loadMapStyle(style) {
    return (dispatch, getState) => {
        const state = getState()

        if (getStyle(state).has('id')) {
            return
        }

        function handleFulfill({data}) {
            dispatch(loadMapStyleSuccess(data))
        }
        function handleReject(error) {
            const message = `Can not fetch Map Style "${style}" from Mapbox API.`

            dispatch(loadMapStyleFailure(new Error(message, error)))
        }

        return fetchMapStyle(style).then(handleFulfill, handleReject)
    }
}
