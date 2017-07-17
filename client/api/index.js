import * as Schemas from '~/api/schemas'
import Axios, { defaults } from 'axios'
import parse from 'date-fns/parse'
import isValid from 'date-fns/is_valid'
import isBefore from 'date-fns/is_before'
import startOfToday from 'date-fns/start_of_today'
import {
    baseURL,
    astBaseUrl,
    weatherBaseUrl,
    staticBaseURL,
    root,
} from './config.json'
import {
    transformSubmissionForPost,
    transformProviderResponse,
    transformCourseResponse,
    sanitizeMountainInformationNetworkSubmissions,
    transformMountainConditionsReports,
} from './transformers'

const api = Axios.create({
    validateStatus(status) {
        return (status >= 200 && status < 300) || status === 404
    },
})

const minPostConfig = {
    transformRequest: [
        transformSubmissionForPost,
        ...defaults.transformRequest,
    ],
}

const POST_CONFIGS = new Map([
    [Schemas.MountainInformationNetworkSubmission, minPostConfig],
])

function minGetConfig({ days }) {
    const params = {
        client: 'web',
    }

    if (days) {
        Object.assign(params, {
            last: `${days}:days`,
        })
    }

    return {
        params,
        transformResponse: defaults.transformResponse.concat(
            sanitizeMountainInformationNetworkSubmissions
        ),
    }
}

function providerGetConfig(params) {
    return {
        params,
        // TODO: To remove when server returns appropriate result
        transformResponse: defaults.transformResponse.concat(
            transformProviderResponse
        ),
    }
}

function courseGetConfig(params) {
    return {
        params,
        // TODO: To remove when server returns appropriate result
        transformResponse: defaults.transformResponse.concat(
            transformCourseResponse
        ),
    }
}

function forecastGetConfig(params) {
    function transform(forecast) {
        const isArchived = isArchiveBulletinRequest(params)

        return {
            ...forecast,
            isArchived,
            date: isArchived ? parse(params.date) : new Date(),
        }
    }

    return {
        transformResponse: defaults.transformResponse.concat(transform),
    }
}

const mcrGetConfig = {
    transformResponse: defaults.transformResponse.concat(
        transformMountainConditionsReports
    ),
}

const GET_CONFIGS = new Map([
    [Schemas.MountainInformationNetworkSubmission, minGetConfig],
    [Schemas.Provider, providerGetConfig],
    [Schemas.Course, courseGetConfig],
    [Schemas.Forecast, forecastGetConfig],
    [Schemas.MountainConditionsReport, mcrGetConfig],
])

function getConfig(schema, params) {
    if (GET_CONFIGS.has(schema)) {
        const config = GET_CONFIGS.get(schema)

        return typeof config === 'function' ? config(params) : config
    }

    return null
}

function isArchiveBulletinRequest({ date }) {
    if (!date) {
        return false
    }

    const archive = parse(date, 'YYYY-MM-DD')

    if (isValid(archive)) {
        return isBefore(archive, startOfToday())
    }

    return false
}

function forecastEndpoint({ name, date }) {
    if (isArchiveBulletinRequest({ name, date })) {
        const archive = parse(date)

        return `${baseURL}/bulletin-archive/${archive.toISOString()}/${name}.json`
    } else {
        return `${baseURL}/forecasts/${name}.json`
    }
}

function getConfigWithIdFactory(paths) {
    return ({ id } = {}) => {
        if (id) {
            paths.push(id)
        }

        return paths.join('/')
    }
}

const minEndpoint = getConfigWithIdFactory([baseURL, 'min', 'submissions'])
const weatherStationEndpoint = getConfigWithIdFactory([
    weatherBaseUrl,
    'stations/',
])

const ENDPOINTS = new Map([
    [Schemas.Provider, `${astBaseUrl}/providers`],
    [Schemas.Course, `${astBaseUrl}/courses`],
    [Schemas.MountainConditionsReport, `${root}/mcr/`],
    [Schemas.Forecast, forecastEndpoint],
    [Schemas.MountainInformationNetworkSubmission, minEndpoint],
    [Schemas.WeatherStation, weatherStationEndpoint],
])

function getEndpoint(schema, params) {
    const endpoint = ENDPOINTS.get(schema)

    return typeof endpoint === 'function' ? endpoint(params) : endpoint
}

export function fetch(schema, params) {
    const endpoint = getEndpoint(schema, params)
    const config = getConfig(schema, params)

    // Special case
    if (schema === Schemas.WeatherStation && params && params.id) {
        // It is a single Schemas.WeatherStation request
        const promises = [
            api.get(endpoint, config),
            api.get(`${endpoint}/measurements/`, config),
        ]
        const mergeStation = ([{ data: station }, { data: measurements }]) => {
            return {
                data: {
                    ...station,
                    measurements,
                },
            }
        }

        return Promise.all(promises).then(mergeStation)
    }

    return api.get(endpoint, config)
}

function extractData(response) {
    return response.data
}

export function post(schema, data) {
    const endpoint = getEndpoint(schema)
    const config = POST_CONFIGS.get(schema)

    return api.post(endpoint, data, config).then(extractData)
}

export function fetchFeaturesMetadata() {
    return api.get(`${baseURL}/features/metadata`).then(extractData)
}

export function fetchStaticResource(resource) {
    return api.get(`${staticBaseURL}/${resource}`)
}

// TODO: Remove that function
export function fetchSponsors() {
    return fetchStaticResource('sponsors')
}
