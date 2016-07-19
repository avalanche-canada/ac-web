import {ForecastRegion, HotZoneArea, Forecast} from './schemas'
import Axios, {defaults} from 'axios'
import {baseURL} from './config.json'

function addIdForMapboxGl(feature) {
    // TODO: Remove the piece of code when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed
    // But, have to look at the filter ['==', 'id', id]
    if (!feature.id) {
        return feature
    }

    feature.properties.id = feature.id

    return feature
}

const ENDPOINTS = new Map([
    [ForecastRegion, params => 'forecasts'],
    [Forecast, params => `forecasts/${params.name}.json`],
    [HotZoneArea, params => 'forecasts'],
])

function transformForecastRegions(data) {
    const features = data.features.filter(({properties}) => properties.type !== 'hotzone').map(addIdForMapboxGl)

    return Object.assign(data, {features})
}
function transformHotZoneAreas(data) {
    const features = data.features.filter(({properties}) => properties.type === 'hotzone').map(addIdForMapboxGl)

    return Object.assign(data, {features})
}

const CONFIGS = new Map([
    [ForecastRegion, {
        transformResponse: defaults.transformResponse.concat(transformForecastRegions)
    }],
    [HotZoneArea, {
        transformResponse: defaults.transformResponse.concat(transformHotZoneAreas)
    }]
])

const fetching = new Map()
function clearPromiseFactory(schema) {
    return function clearPromise(payload) {
        fetching.delete(schema)

        return payload
    }
}

const api = Axios.create({
    baseURL
})

export function fetch(schema, params) {
    if (fetching.has(schema)) {
        return fetching.get(schema)
    }

    const config = CONFIGS.get(schema)
    const endpoint = ENDPOINTS.get(schema)(params)
    const clear = clearPromiseFactory(schema)
    const promise = api.get(endpoint, config).then(clear, clear)

    fetching.set(schema, promise)

    return promise
}
