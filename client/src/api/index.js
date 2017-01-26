import * as SCHEMAS from 'api/schemas'
import Axios, {defaults} from 'axios'
import moment from 'moment'
import {baseURL, astBaseUrl, weatherBaseUrl} from 'api/config.json'
import Url from 'url'

const {
    Forecast,
    MountainInformationNetworkSubmission,
    Incident,
    Provider,
    Course,
    WeatherStation,
} = SCHEMAS

function transformProvider(provider) {
    return {
        ...provider,
        isSponsor: provider.is_sponsor,
        locDescription: provider.loc_description,
        primContact: provider.prim_contact,
    }
}

const CONFIGS = new Map([
    [Incident, ({slug, ...params}) => {
        if (slug) {
            return
        }

        return {
            params
        }
    }],
    [MountainInformationNetworkSubmission, ({id, days}) => {
        if (id) {
            return {
                params: {
                    client: 'web',
                }
            }
        } else {
            return {
                params: {
                    client: 'web',
                    last: `${days}:days`,
                }
            }
        }
    }],
    [Provider, params => ({
        baseURL: astBaseUrl,
        params,
        // TODO: To remove when server return appropriate result
        transformResponse: defaults.transformResponse.concat(data => ({
            ...data,
            results: data.results.map(transformProvider)
        })),
    })],
    [Course, params => ({
        baseURL: astBaseUrl,
        params,
        // TODO: To remove when server return appropriate result
        transformResponse: defaults.transformResponse.concat(data => ({
            ...data,
            results: data.results.map(course => ({
                ...course,
                dateStart: course.date_start,
                dateEnd: course.date_end,
                locDescription: course.loc_description,
                provider: transformProvider(course.provider),
            }))
        })),
    })],
    [WeatherStation, params => ({
        baseURL: weatherBaseUrl,
    })],
])

function isArchiveBulletinRequest({name, date}) {
    if (!date) {
        return false
    }

    const archive = moment(date, 'YYYY-MM-DD')

    if (!archive.isValid()) {
        throw new Error(`Date ${date} is not valid.`)
    }

    return archive.isBefore(new Date(), 'day')
}

function forecastEndpoint({name, date}) {
    if (isArchiveBulletinRequest({name, date})) {
        const archive = moment(date)

        return `bulletin-archive/${archive.toISOString()}/${name}.json`
    } else {
        return `forecasts/${name}.json`
    }
}

const ENDPOINTS = new Map([
    [Forecast, forecastEndpoint],
    [MountainInformationNetworkSubmission, (params = {}) => params.id ? `min/submissions/${params.id}`: 'min/submissions'],
    [Incident, ({slug}) => slug ? `incidents/${slug}` : 'incidents'],
    [Provider, params => 'providers'],
    [Course, params => 'courses'],
    [WeatherStation, (params = {}) => params.id ? `stations/${params.id}/`: 'stations/'],
])

const api = Axios.create({
    baseURL
})

export function fetch(schema, params) {
    const endpoint = ENDPOINTS.get(schema)(params)
    const config = CONFIGS.has(schema) ? CONFIGS.get(schema)(params) : null

    if (schema === WeatherStation && params && params.id) {
        // It is a single WeatherStation request
        return Promise.all([
            api.get(endpoint, config),
            api.get(`${endpoint}measurements/`, config)
        ]).then(function merge([{data: station}, {data: measurements}]) {
            return {
                data: {
                    ...station,
                    measurements,
                }
            }
        })
    }

    return api.get(endpoint, config)
}

export function post(schema, data) {
    const endpoint = ENDPOINTS.get(schema).call()

    return api.post(endpoint, data).then(response => response.data)
}

export function fetchFeaturesMetadata() {
    return api.get('features/metadata')
}
