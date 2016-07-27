import {combineReducers} from 'redux'
import {List} from 'immutable'
import * as SCHEMAS from 'api/schemas'
import {
    FORECAST_REQUEST,
    FORECAST_SUCCESS,
    FORECAST_FAILURE,
    FORECAST_REGIONS_REQUEST,
    FORECAST_REGIONS_SUCCESS,
    FORECAST_REGIONS_FAILURE,
    HOT_ZONE_AREAS_REQUEST,
    HOT_ZONE_AREAS_SUCCESS,
    HOT_ZONE_AREAS_FAILURE,
    HOT_ZONE_REPORT_REQUEST,
    HOT_ZONE_REPORT_SUCCESS,
    HOT_ZONE_REPORT_FAILURE,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE,
} from 'actions/entities'
import {actionToKey} from 'api/utils'
import {getEntitiesForSchemaIds} from 'reducers/api/entities'
import {getResultsSetForSchema} from 'reducers/api/getters'

const {
    MountainInformationNetworkObservation,
    ForecastRegion,
    Forecast,
    HotZoneArea,
    HotZoneReport,
} = SCHEMAS

const {isArray} = Array

function toArray(value) {
    return isArray(value) ? value : [value]
}

const EMPTY_LIST = new List()

const RESULT = {
    isFetching: false,
    isLoaded: false,
    ids: new Set(),
}

function resultsReducerFactory(schema, request, success, failure) {
    function results(state = RESULT, {type, payload}) {
        switch (type) {
            case request:
                return {
                    ...state,
                    isFetching: true,
                    isLoaded: false,
                }
            case success:
                return {
                    ...state,
                    isFetching: false,
                    isLoaded: true,
                    ids: new Set([...state.ids, ...toArray(payload.result)]),
                }
            case failure:
                return {
                    ...state,
                    isFetching: false,
                    isLoaded: false,
                }
            default:
                return state
        }

    }

    return function resultsByKey(state = {}, action) {
        switch (action.type) {
            case request:
            case success:
            case failure:
                const key = actionToKey(schema, action)

                return {
                    ...state,
                    [key]: results(state[key], action)
                }
            default:
                return state
        }
    }
}

export default combineReducers({
    [MountainInformationNetworkObservation.getKey()]: resultsReducerFactory(
        MountainInformationNetworkObservation,
        MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST,
        MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS,
        MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE,
    ),
    [ForecastRegion.getKey()]: resultsReducerFactory(
        ForecastRegion,
        FORECAST_REGIONS_REQUEST,
        FORECAST_REGIONS_SUCCESS,
        FORECAST_REGIONS_FAILURE,
    ),
    [Forecast.getKey()]: resultsReducerFactory(
        Forecast,
        FORECAST_REQUEST,
        FORECAST_SUCCESS,
        FORECAST_FAILURE,
    ),
    [HotZoneArea.getKey()]: resultsReducerFactory(
        HotZoneArea,
        HOT_ZONE_AREAS_REQUEST,
        HOT_ZONE_AREAS_SUCCESS,
        HOT_ZONE_AREAS_FAILURE,
    ),
    [HotZoneReport.getKey()]: resultsReducerFactory(
        HotZoneReport,
        HOT_ZONE_REPORT_REQUEST,
        HOT_ZONE_REPORT_SUCCESS,
        HOT_ZONE_REPORT_FAILURE,
    ),
})

// TODO: More to getters file
export function getMountainInformationNetworkObservationsForDays(state, days) {
    const results = getResultsSetForSchema(MountainInformationNetworkObservation)

    if (!results || !results[days]) {
        return EMPTY_LIST
    }

    const {ids} = results[days]
    const entities = getEntitiesForSchemaIds(state, MountainInformationNetworkObservation, [...ids])

    return new List(entities)
}
