import * as Schemas from 'api/schemas'
import * as forecast from './requests/forecast'
import * as min from './requests/min'
import * as weather from './requests/weather'
import * as ast from './requests/ast'
import * as mcr from './requests/mcr'
import { resource } from './requests/static'
import * as transformers from './transformers'
import { status } from 'services/fetch/utils'

const TRANSFORMERS = new Map([
    [
        Schemas.MountainInformationNetworkSubmission,
        transformers.sanitizeMountainInformationNetworkSubmissions,
    ],
    [Schemas.Provider, transformers.transformProviderResponse],
    [Schemas.Forecast, transformers.transformForecast],
    [
        Schemas.MountainConditionsReport,
        transformers.transformMountainConditionsReports,
    ],
])

// FIXME: Find we better way to handle by schema
const REQUESTS = new Map([
    [
        Schemas.Forecast,
        ({ name, date }) => {
            return forecast.forecast(name, date)
        },
    ],
    [
        Schemas.MountainInformationNetworkSubmission,
        ({ id, days }) => {
            return id ? min.report(id) : min.reports(days)
        },
    ],
    [
        Schemas.Provider,
        params => {
            return ast.providers(params)
        },
    ],
    [
        Schemas.WeatherStation,
        () => {
            return weather.stations()
        },
    ],
    [
        Schemas.MountainConditionsReport,
        () => {
            return mcr.reports()
        },
    ],
])

export function fetch(schema, params = {}) {
    const request = REQUESTS.get(schema).call(null, params)
    const transformer = TRANSFORMERS.get(schema) || identity

    // FIXME: Remove that condition!!!
    // It is a single Schemas.WeatherStation request
    if (schema === Schemas.WeatherStation && params.id) {
        const { id } = params

        return Promise.all([
            window.fetch(weather.station(id)).then(status),
            window.fetch(weather.measurements(id)).then(status),
        ]).then(([station, measurements]) => ({
            ...station,
            measurements,
        }))
    }

    return window
        .fetch(request)
        .then(status)
        .then(transformer)
}

export function post(schema, data) {
    if (schema === Schemas.MountainInformationNetworkSubmission) {
        return window
            .fetch(min.post(data))
            .then(status)
            .then(transformers.sanitizeMountainInformationNetworkSubmissions)
    } else {
        throw new Error(`Can not post data for schema ${schema}`)
    }
}

export function fetchFeaturesMetadata() {
    return window.fetch('/api/features/metadata').then(status)
}

export function fetchStaticResource(name) {
    return window.fetch(resource(name)).then(status)
}

function identity(data) {
    return data
}
