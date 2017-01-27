import {createAction} from 'redux-actions'
import * as Schemas from 'api/schemas'
import * as Api from 'api'
import {createFetchActionForSchema, createFetchMetadataAction} from 'api/utils'

export const GET_FORECAST = 'GET_FORECAST'
export const GET_FEATURES_METADATA = 'GET_FEATURES_METADATA'
export const GET_MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS = 'GET_MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS'
export const GET_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION = 'GET_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION'
export const GET_INCIDENTS = 'GET_INCIDENTS'
export const GET_PROVIDERS = 'GET_PROVIDERS'
export const GET_COURSES = 'GET_COURSES'
export const GET_WEATHER_STATIONS = 'GET_WEATHER_STATIONS'

export const POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION = 'POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION'

export const loadFeaturesMetadata = createFetchMetadataAction()

export const loadForecast = createFetchActionForSchema(
    GET_FORECAST,
    Schemas.Forecast
)

const loadMountainInformationNetworkSubmissions = createFetchActionForSchema(
    GET_MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS,
    Schemas.MountainInformationNetworkSubmission,
)

export function loadMountainInformationNetworkSubmissionsForDays(days = 7) {
    return loadMountainInformationNetworkSubmissions({days})
}

export function loadMountainInformationNetworkSubmission(id) {
    return loadMountainInformationNetworkSubmissions({id})
}

export const loadIncidents = createFetchActionForSchema(
    GET_INCIDENTS,
    Schemas.Incident
)
export const loadProviders = createFetchActionForSchema(
    GET_PROVIDERS,
    Schemas.Provider,
)

export const loadCourses = createFetchActionForSchema(
    GET_COURSES,
    Schemas.Course,
)

export const loadWeatherStations = createFetchActionForSchema(
    GET_WEATHER_STATIONS,
    Schemas.WeatherStation,
)

export function loadWeatherStation(id) {
    return loadWeatherStations({id})
}

// CREATE ENTITY
export const postMountainInformationNetworkSubmission = createAction(
    POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION,
    submission => Api.post(Schemas.MountainInformationNetworkSubmission, submission)
)
