import {createAction} from 'redux-actions'
import {getVisibleLayers} from 'getters/drawers'
import {getStyle} from 'getters/map'
import {fetchMapStyle} from 'services/mapbox/api'
import MapLayers from 'constants/map/layers'
import MapSources from 'constants/map/sources'
import * as PrismicActions from 'actions/prismic'
import * as EntitiesActions from 'actions/entities'
import * as Layers from 'constants/drawers'

export const MAP_COMMAND_CREATED = 'MAP_COMMAND_CREATED'
export const LOAD_MAP_STYLE_SUCCESS = 'LOAD_MAP_STYLE_SUCCESS'
export const LOAD_MAP_STYLE_FAILURE = 'LOAD_MAP_STYLE_FAILURE'
export const ACTIVE_FEATURES_CHANGED = 'ACTIVE_FEATURES_CHANGED'

export const activeFeaturesChanged = createAction(ACTIVE_FEATURES_CHANGED)

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

        dispatch(EntitiesActions.loadFeaturesMetadata())

        layers.map(createActionForLayer).filter(Boolean).forEach(dispatch)
    }
}

function createActionForLayer(layer) {
    switch (layer.get('id')) {
        case Layers.HOT_ZONE_REPORTS:
            return PrismicActions.loadHotZoneReports()
        case Layers.MOUNTAIN_INFORMATION_NETWORK:
            const value = layer.getIn(['filters', 'days', 'value'])

            return EntitiesActions.loadMountainInformationNetworkSubmissionsForDays(value)
        case Layers.TOYOTA_TRUCK_REPORTS:
            return PrismicActions.loadToyotaTruckReports()
        case Layers.WEATHER_STATION:
            return EntitiesActions.loadWeatherStations()
    }
}

export function loadMapStyle(style) {
    return (dispatch, getState) => {
        function handleFulfill({data}) {
            const style = getStyle(getState())

            if (data.modified !== style.get('modified')) {
                const loadMapStyleSuccess = createAction(LOAD_MAP_STYLE_SUCCESS)

                dispatch(loadMapStyleSuccess(data))
            }
        }
        function handleReject(error) {
            const loadMapStyleFailure = createAction(LOAD_MAP_STYLE_FAILURE)
            const message = `Can not fetch Map Style "${style}" from Mapbox API.`

            dispatch(loadMapStyleFailure(new Error(message, error)))
        }

        return fetchMapStyle(style).then(handleFulfill, handleReject)
    }
}
