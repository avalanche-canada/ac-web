import * as Schemas from 'api/schemas'
import * as min from './requests/min'
import * as weather from './requests/weather'
import * as mcr from './requests/mcr'
import * as transformers from './transformers'
import { status } from 'services/fetch/utils'

const TRANSFORMERS = new Map([
    [
        Schemas.MountainInformationNetworkSubmission,
        transformers.sanitizeMountainInformationNetworkSubmissions,
    ],
    [
        Schemas.MountainConditionsReport,
        transformers.transformMountainConditionsReports,
    ],
])

// FIXME: Find we better way to handle by schema
const REQUESTS = new Map([
    [
        Schemas.MountainInformationNetworkSubmission,
        ({ id, days }) => {
            return id ? min.report(id) : min.reports(days)
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

function identity(data) {
    return data
}
