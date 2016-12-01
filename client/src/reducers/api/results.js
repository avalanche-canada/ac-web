import {combineReducers} from 'redux'
import {List, Map, is} from 'immutable'
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
    HOT_ZONE_REPORTS_REQUEST,
    HOT_ZONE_REPORTS_SUCCESS,
    HOT_ZONE_REPORTS_FAILURE,
    INCIDENTS_REQUEST,
    INCIDENTS_SUCCESS,
    INCIDENTS_FAILURE,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE,
    POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
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

const EMPTY_LIST = new List()

export const RESULT = {
    isFetching: false,
    isLoaded: false,
    isError: false,
    ids: new Set(),
    props: {},
}

function resultsReducerFactory(schema, request, success, failure, postSuccess = null) {
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
            case postSuccess:
                return {
                    ...state,
                    isLoaded: false,
                }
            default:
                return state
        }

    }

    return function resultsByKey(state = new Map(), action) {
        const {type} = action

        switch (type) {
            case request:
            case success:
            case failure:
                const {payload, meta} = action
                const {params} = type === request ? payload : meta
                const key = paramsToKey(params)
                const value = results(state.get(key), action)

                return state.set(key, value)
            default:
                return state
        }
    }
}

export default combineReducers({
    [MountainInformationNetworkSubmission.getKey()]: resultsReducerFactory(
        MountainInformationNetworkSubmission,
        MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST,
        MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
        MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE,
        POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
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
    [HotZone.getKey()]: resultsReducerFactory(
        HotZone,
        HOT_ZONE_AREAS_REQUEST,
        HOT_ZONE_AREAS_SUCCESS,
        HOT_ZONE_AREAS_FAILURE,
    ),
    [HotZoneReport.getKey()]: resultsReducerFactory(
        HotZoneReport,
        HOT_ZONE_REPORTS_REQUEST,
        HOT_ZONE_REPORTS_SUCCESS,
        HOT_ZONE_REPORTS_FAILURE,
    ),
    [Incident.getKey()]: resultsReducerFactory(
        Incident,
        INCIDENTS_REQUEST,
        INCIDENTS_SUCCESS,
        INCIDENTS_FAILURE,
    ),
    [Provider.getKey()]: resultsReducerFactory(
        Provider,
        PROVIDERS_REQUEST,
        PROVIDERS_SUCCESS,
        PROVIDERS_FAILURE,
    ),
    [Course.getKey()]: resultsReducerFactory(
        Course,
        COURSES_REQUEST,
        COURSES_SUCCESS,
        COURSES_FAILURE,
    ),
    [WeatherStation.getKey()]: resultsReducerFactory(
        WeatherStation,
        WEATHER_STATIONS_REQUEST,
        WEATHER_STATIONS_SUCCESS,
        WEATHER_STATIONS_FAILURE,
    ),
})
