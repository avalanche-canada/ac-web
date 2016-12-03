import {combineReducers} from 'redux'
import {List, Map} from 'immutable'
import * as SCHEMAS from 'api/schemas'
import {
    FEATURES_METADATA_REQUEST,
    FEATURES_METADATA_SUCCESS,
    FEATURES_METADATA_FAILURE,
    FORECAST_REQUEST,
    FORECAST_SUCCESS,
    FORECAST_FAILURE,
    HOT_ZONE_REPORTS_REQUEST,
    HOT_ZONE_REPORTS_SUCCESS,
    HOT_ZONE_REPORTS_FAILURE,
    INCIDENTS_REQUEST,
    INCIDENTS_SUCCESS,
    INCIDENTS_FAILURE,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE,
    PROVIDERS_REQUEST,
    PROVIDERS_SUCCESS,
    PROVIDERS_FAILURE,
    COURSES_REQUEST,
    COURSES_SUCCESS,
    COURSES_FAILURE,
    WEATHER_STATIONS_REQUEST,
    WEATHER_STATIONS_SUCCESS,
    WEATHER_STATIONS_FAILURE,
} from 'actions/entities'
import {paramsToKey} from 'api/utils'

const {
    MountainInformationNetworkSubmission,
    ForecastRegion,
    Forecast,
    HotZone,
    HotZoneReport,
    Incident,
    Provider,
    Course,
    WeatherStation,
} = SCHEMAS

const {isArray} = Array

function getIds(result) {
    if (!result) {
        return new Set()
    }

    if (isArray(result)) {
        return result
    } else if (isArray(result.results)) {
        return result.results
    } else if (isArray(result.features)) {
        return result.features
    } else {
        return [result]
    }
}

export const RESULT = {
    isFetching: false,
    isLoaded: false,
    isError: false,
    ids: new Set(),
    props: {},
}

function resultsReducerFactory(request, success, failure) {
    const types = new Set([request, success, failure])

    function results(state = RESULT, {type, payload}) {
        switch (type) {
            case request:
                return {
                    ...state,
                    isFetching: true,
                    isLoaded: false,
                    isError: false,
                }
            case success:
                const {result} = payload

                return {
                    ...state,
                    isFetching: false,
                    isLoaded: true,
                    isError: false,
                    ids: new Set([...state.ids, ...getIds(result)]),
                    ...result,
                }
            case failure:
                return {
                    ...state,
                    isFetching: false,
                    isLoaded: false,
                    isError: true,
                }
            default:
                return state
        }

    }

    return function resultsByKey(state = new Map(), action) {
        const {type} = action
        if (types.has(type)) {
            const {payload, meta} = action
            const {params} = type === request ? payload : meta
            const key = paramsToKey(params)
            const value = results(state.get(key), action)

            return state.set(key, value)
        }

        return state
    }
}

export default combineReducers({
    [ForecastRegion.getKey()]: resultsReducerFactory(
        FEATURES_METADATA_REQUEST,
        FEATURES_METADATA_SUCCESS,
        FEATURES_METADATA_FAILURE,
    ),
    [HotZone.getKey()]: resultsReducerFactory(
        FEATURES_METADATA_REQUEST,
        FEATURES_METADATA_SUCCESS,
        FEATURES_METADATA_FAILURE,
    ),
    [Forecast.getKey()]: resultsReducerFactory(
        FORECAST_REQUEST,
        FORECAST_SUCCESS,
        FORECAST_FAILURE,
    ),
    [HotZoneReport.getKey()]: resultsReducerFactory(
        HOT_ZONE_REPORTS_REQUEST,
        HOT_ZONE_REPORTS_SUCCESS,
        HOT_ZONE_REPORTS_FAILURE,
    ),
    [MountainInformationNetworkSubmission.getKey()]: resultsReducerFactory(
        MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST,
        MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
        MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE,
    ),
    [Incident.getKey()]: resultsReducerFactory(
        INCIDENTS_REQUEST,
        INCIDENTS_SUCCESS,
        INCIDENTS_FAILURE,
    ),
    [Provider.getKey()]: resultsReducerFactory(
        PROVIDERS_REQUEST,
        PROVIDERS_SUCCESS,
        PROVIDERS_FAILURE,
    ),
    [Course.getKey()]: resultsReducerFactory(
        COURSES_REQUEST,
        COURSES_SUCCESS,
        COURSES_FAILURE,
    ),
    [WeatherStation.getKey()]: resultsReducerFactory(
        WEATHER_STATIONS_REQUEST,
        WEATHER_STATIONS_SUCCESS,
        WEATHER_STATIONS_FAILURE,
    ),
})
