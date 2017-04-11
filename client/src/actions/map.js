import {createAction} from 'redux-actions'
import {getVisibleLayers} from '/getters/drawers'
import {getStyle, getStatus} from '/getters/map'
import {fetchMapStyle} from '/services/mapbox/api'
import MapLayers from '/constants/map/layers'
import MapSources from '/constants/map/sources'
import * as PrismicActions from '/actions/prismic'
import * as EntitiesActions from '/actions/entities'
import * as Layers from '/constants/drawers'
import {Predicates} from '/prismic'
import format from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import startOfYesterday from 'date-fns/start_of_yesterday'

export const MAP_COMMAND_CREATED = 'MAP_COMMAND_CREATED'
export const LOAD_MAP_STYLE = 'LOAD_MAP_STYLE'
export const ACTIVE_FEATURES_CHANGED = 'ACTIVE_FEATURES_CHANGED'
export const MAP_WIDTH_CHANGED = 'MAP_WIDTH_CHANGED'

export const activeFeaturesChanged = createAction(ACTIVE_FEATURES_CHANGED)
export const mapWidthChanged = createAction(MAP_WIDTH_CHANGED)

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
            return PrismicActions.load({
                type: 'hotzone-report',
                predicates: [
                    Predicates.dateBefore('my.hotzone-report.dateOfIssue', format(startOfTomorrow(), 'YYYY-MM-DD')),
                    Predicates.dateAfter('my.hotzone-report.validUntil', format(startOfYesterday(), 'YYYY-MM-DD')),
                ]
            })
        case Layers.MOUNTAIN_INFORMATION_NETWORK:
            const value = layer.getIn(['filters', 'days', 'value'])

            return EntitiesActions.loadMountainInformationNetworkSubmissionsForDays(value)
        case Layers.TOYOTA_TRUCK_REPORTS:
            return PrismicActions.load({
                type: 'toyota-truck-report'
            })
        case Layers.SPECIAL_INFORMATION:
            return PrismicActions.load({
                type: 'special-information'
            })
        case Layers.FATAL_ACCIDENT:
            return PrismicActions.load({
                type: 'fatal-accident'
            })
        case Layers.WEATHER_STATION:
            return EntitiesActions.loadWeatherStations()
    }
}

export function loadMapStyle(id) {
    return (dispatch, getState) => {
        const state = getState()
        const style = getStyle(state)
        const status = getStatus(state)

        if (!style || !status.isLoaded) {
            dispatch({
                type: LOAD_MAP_STYLE,
                payload: fetchMapStyle(id)
            })
        }
    }
}
