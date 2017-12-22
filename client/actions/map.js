import { createAction } from 'redux-actions'
import { getVisibleLayers } from 'getters/drawers'
import { getStyle, getStatus } from 'getters/map'
import { fetchMapStyle } from 'services/mapbox/api'
import * as PrismicActions from 'actions/prismic'
import * as EntitiesActions from 'actions/entities'
import * as Layers from 'constants/drawers'
import { Predicates } from 'prismic'
import format from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import startOfYesterday from 'date-fns/start_of_yesterday'
import { startOfSeason } from 'utils/date'
import {
    TOYOTA_TRUCK_REPORT,
    SPECIAL_INFORMATION,
    FATAL_ACCIDENT,
    HOTZONE_REPORT,
} from 'constants/prismic'

export const LOAD_MAP_STYLE = 'LOAD_MAP_STYLE'
export const ACTIVE_FEATURES_CHANGED = 'ACTIVE_FEATURES_CHANGED'

export const activeFeaturesChanged = createAction(ACTIVE_FEATURES_CHANGED)

export function loadData() {
    return (dispatch, getState) => {
        const layers = getVisibleLayers(getState())

        dispatch(EntitiesActions.loadFeaturesMetadata())

        layers
            .map(createActionForLayer)
            .filter(Boolean)
            .forEach(dispatch)
    }
}

function createActionForLayer(layer) {
    switch (layer.get('id')) {
        case Layers.HOT_ZONE_REPORTS:
            return PrismicActions.load({
                predicates: [
                    Predicates.type(HOTZONE_REPORT),
                    Predicates.dateBefore(
                        `my.${HOTZONE_REPORT}.dateOfIssue`,
                        format(startOfTomorrow(), 'YYYY-MM-DD')
                    ),
                    Predicates.dateAfter(
                        `my.${HOTZONE_REPORT}.validUntil`,
                        format(startOfYesterday(), 'YYYY-MM-DD')
                    ),
                ],
            })
        case Layers.MOUNTAIN_INFORMATION_NETWORK: {
            const value = layer.getIn(['filters', 'days', 'value'])

            return EntitiesActions.loadMountainInformationNetworkSubmissionsForDays(
                value
            )
        }
        case Layers.TOYOTA_TRUCK_REPORTS:
            return PrismicActions.load({
                predicates: [Predicates.type(TOYOTA_TRUCK_REPORT)],
            })
        case Layers.SPECIAL_INFORMATION:
            return PrismicActions.load({
                predicates: [Predicates.type(SPECIAL_INFORMATION)],
            })
        case Layers.FATAL_ACCIDENT:
            return PrismicActions.load({
                predicates: [
                    Predicates.type(FATAL_ACCIDENT),
                    Predicates.dateAfter(
                        `my.${FATAL_ACCIDENT}.dateOfIssue`,
                        format(startOfSeason().getTime() - 1, 'YYYY-MM-DD')
                    ),
                ],
            })
        case Layers.WEATHER_STATION:
            return EntitiesActions.loadWeatherStations()
        case Layers.MOUNTAIN_CONDITIONS_REPORTS:
            return EntitiesActions.loadMountainConditionsReports()
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
                payload: fetchMapStyle(id),
            })
        }
    }
}
