import * as SCHEMAS from 'api/schemas'
import Axios, {defaults} from 'axios'
import {baseURL} from 'api/config.json'
import {transformHotZoneAreas, transformForecastRegions} from './transformers'
import Url from 'url'

const {
    ForecastRegion,
    HotZoneArea,
    Forecast,
    HotZoneReport,
    MountainInformationNetworkObservation,
} = SCHEMAS

const CONFIGS = new Map([
    [ForecastRegion, {
        transformResponse: defaults.transformResponse.concat(transformForecastRegions)
    }],
    [HotZoneArea, {
        transformResponse: defaults.transformResponse.concat(transformHotZoneAreas)
    }]
])

const ENDPOINTS = new Map([
    [ForecastRegion, params => 'forecasts'],
    [Forecast, params => `forecasts/${params.name}.json`],
    [HotZoneArea, params => `forecasts`],
    [HotZoneReport, params => `not-a-valid-url`],
    [MountainInformationNetworkObservation, params => `min/observations?client=web&last=${params.days}:days`],
])

const fetching = new Map()

const api = Axios.create({
    baseURL
})

function deletePromise(response) {
    const {url} = response.config

    fetching.delete(url)

    return response
}

api.interceptors.response.use(
    deletePromise,
    function (error) {
        const {response} = error

        if (response) {
            deletePromise(response)
        }

        return Promise.reject(error)
    }
)

export function fetch(schema, params) {
    const config = CONFIGS.get(schema)
    const endpoint = ENDPOINTS.get(schema)(params)
    const url = `${baseURL}/${endpoint}`

    if (fetching.has(url)) {
        return fetching.get(url)
    } else {
        const promise = api.get(endpoint, config)

        fetching.set(url, promise)

        return promise
    }

}
