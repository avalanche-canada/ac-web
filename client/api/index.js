import * as Schemas from '~/api/schemas'
import Axios, { defaults } from 'axios'
import parse from 'date-fns/parse'
import isValid from 'date-fns/is_valid'
import isBefore from 'date-fns/is_before'
import startOfToday from 'date-fns/start_of_today'
import { baseURL, astBaseUrl, weatherBaseUrl, root } from './config.json'
import {
    transformSubmissionForPost,
    transformProviderResponse,
    transformCourseResponse,
    sanitizeMountainInformationNetworkSubmissions,
    transformMountainConditionsReports,
} from './transformers'

const POST_CONFIGS = new Map([
    [
        Schemas.MountainInformationNetworkSubmission,
        {
            transformRequest: [
                transformSubmissionForPost,
                ...defaults.transformRequest,
            ],
        },
    ],
])

const GET_CONFIGS = new Map([
    [
        Schemas.MountainInformationNetworkSubmission,
        ({ days }) => {
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
        },
    ],
    [
        Schemas.Provider,
        params => ({
            baseURL: astBaseUrl,
            params,
            // TODO: To remove when server returns appropriate result
            transformResponse: defaults.transformResponse.concat(
                transformProviderResponse
            ),
        }),
    ],
    [
        Schemas.Course,
        params => ({
            baseURL: astBaseUrl,
            params,
            // TODO: To remove when server returns appropriate result
            transformResponse: defaults.transformResponse.concat(
                transformCourseResponse
            ),
        }),
    ],
    [
        Schemas.WeatherStation,
        () => ({
            baseURL: weatherBaseUrl,
        }),
    ],
    [
        Schemas.Forecast,
        params => {
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
        },
    ],
    [
        Schemas.MountainConditionsReport,
        () => ({
            transformResponse: defaults.transformResponse.concat(
                transformMountainConditionsReports
            ),
        }),
    ],
])

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

        return `bulletin-archive/${archive.toISOString()}/${name}.json`
    } else {
        return `forecasts/${name}.json`
    }
}

const ENDPOINTS = new Map([
    [Schemas.Provider, 'providers'],
    [Schemas.Course, 'courses'],
    [Schemas.MountainConditionsReport, 'mcr'],
    [Schemas.Forecast, forecastEndpoint],
    [
        Schemas.MountainInformationNetworkSubmission,
        (params = {}) =>
            (params.id ? `min/submissions/${params.id}` : 'min/submissions'),
    ],
    [
        Schemas.WeatherStation,
        (params = {}) => (params.id ? `stations/${params.id}/` : 'stations/'),
    ],
])

const Api = Axios.create({
    baseURL,
    validateStatus(status) {
        return (status >= 200 && status < 300) || status === 404
    },
})

const UmbrellaApi = Axios.create({
    baseURL: root,
    validateStatus(status) {
        return (status >= 200 && status < 300) || status === 404
    },
})

export function fetch(schema, params) {
    let endpoint = ENDPOINTS.get(schema)
    const config = GET_CONFIGS.has(schema)
        ? GET_CONFIGS.get(schema).call(null, params)
        : null

    if (typeof endpoint === 'function') {
        endpoint = endpoint(params)
    }

    if (schema === Schemas.WeatherStation && params && params.id) {
        // It is a single Schemas.WeatherStation request
        return Promise.all([
            Api.get(endpoint, config),
            Api.get(`${endpoint}measurements/`, config),
        ]).then(function merge([{ data: station }, { data: measurements }]) {
            return {
                data: {
                    ...station,
                    measurements,
                },
            }
        })
    }

    if (schema === Schemas.MountainConditionsReport) {
        return UmbrellaApi.get(endpoint, config)
    }

    return Api.get(endpoint, config)
}

function extractData(response) {
    return response.data
}

export function post(schema, data) {
    let endpoint = ENDPOINTS.get(schema)
    const config = POST_CONFIGS.get(schema)

    if (typeof endpoint === 'function') {
        endpoint = endpoint()
    }

    return Api.post(endpoint, data, config).then(extractData)
}

export function fetchFeaturesMetadata() {
    return Api.get('features/metadata').then(extractData)
}

const Static = Axios.create({
    baseURL: '/static',
})

export function fetchStaticResource(resource) {
    return Static.get(resource)
}

export function fetchSponsors() {
    return fetchStaticResource('sponsors.json')
}
