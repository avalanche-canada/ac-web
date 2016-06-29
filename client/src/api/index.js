import {ForecastRegion, HotZoneArea} from './schemas'
import Axios, {defaults} from 'axios'

const endpoints = new Map([
    [ForecastRegion, 'forecasts'],
    [HotZoneArea, 'forecasts'],
])

const responseTransformers = new Map([
    [ForecastRegion, data => {
        const features = data.features.filter(({properties}) => properties.type !== 'hotzone')

        return Object.assign(data, {features})
    }],
    [HotZoneArea, data => {
        const features = data.features.filter(({properties}) => properties.type === 'hotzone')

        return Object.assign(data, {features})
    }],
])

const api = Axios.create({
    baseURL: 'http://www.avalanche.ca/api'
})

export function fetch(schema) {
    const config = {}

    if (responseTransformers.has(schema)) {
        Object.assign(config, {
            transformResponse: defaults.transformResponse.concat(responseTransformers.get(schema))
        })
    }

    return api.get(endpoints.get(schema), config)
}
