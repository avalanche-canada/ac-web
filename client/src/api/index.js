import * as SCHEMAS from 'api/schemas'
import Axios, {defaults} from 'axios'
import query from 'query-string'
import {baseURL} from 'api/config.json'
import * as transformers from './transformers'
import Url from 'url'

const {
    ForecastRegion,
    HotZoneArea,
    Forecast,
    HotZoneReport,
    MountainInformationNetworkObservation,
    Incident,
    Provider,
    Course,
} = SCHEMAS

const CONFIGS = new Map([
    [ForecastRegion, params => ({
        transformResponse: defaults.transformResponse.concat(transformers.transformForecastRegions),
    })],
    [HotZoneArea, params => ({
        transformResponse: defaults.transformResponse.concat(transformers.transformHotZoneAreas),
    })],
    [Incident, ({slug, ...params}) => {
        if (slug) {
            return
        }

        return {
            params
        }
    }],
    [HotZoneReport, params => ({
        params: {
            client: 'web'
        }
    })],
    [MountainInformationNetworkObservation, params => ({
        params: {
            client: 'web',
            last: `${params.days}:days`,
        }
    })],
    [Provider, params => ({
        baseURL: 'http://ac-ast-qa.us-west-2.elasticbeanstalk.com/api/',
        transformResponse: defaults.transformResponse.concat(transformers.transformResponseFromDjango),
    })],
    [Course, params => ({
        baseURL: 'http://ac-ast-qa.us-west-2.elasticbeanstalk.com/api/',
        transformResponse: defaults.transformResponse.concat(transformers.transformResponseFromDjango),
    })],
])

// TODO: Update endpoint for HotZoneArea when available
const ENDPOINTS = new Map([
    [ForecastRegion, params => 'forecasts'],
    [Forecast, params => `forecasts/${params.name}.json`],
    [HotZoneArea, params => `forecasts`],
    [HotZoneReport, params => `hzr/submissions`],
    [MountainInformationNetworkObservation, params => `min/observations`],
    [Incident, ({slug}) => slug ? `incidents/${slug}` : 'incidents'],
    [Provider, params => 'providers'],
    [Course, params => 'courses'],
])

const api = Axios.create({
    baseURL
})

export function fetch(schema, params) {
    const endpoint = ENDPOINTS.get(schema)(params)
    const config = CONFIGS.has(schema) ? CONFIGS.get(schema)(params) : null

    return api.get(endpoint, config)
}
