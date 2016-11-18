import {paramsToKey} from 'api/utils'
import {RESULT} from './results'
import {getEntityForSchema} from './entities'
import {ForecastRegion} from 'api/schemas'

export {getEntitiesForSchema} from './entities'

export function getResultsSetForSchema(state, schema) {
    return state.api.results[schema.getKey()]
}

export function getResultsSet(state, schema, params) {
    const sets = getResultsSetForSchema(state, schema)
    const key = paramsToKey(params)

    return sets.get(key, RESULT)
}

export function shouldDispatchLoadAction(state, schema, action) {
    const {params} = action.payload
    const sets = getResultsSetForSchema(state, schema)
    const key = paramsToKey(params)
    const results = sets.get(key)

    return !results || (!results.isLoaded && !results.isFetching)
}

const EXTERNAL_URLS = new Map([
    ['little-yoho', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=5&d=TODAY'],
    ['banff-yoho-kootenay', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=1&d=TODAY'],
    ['vancouver-island', 'http://www.islandavalanchebulletin.com/'],
    ['jasper', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=2&d=TODAY'],
    ['waterton', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=4&d=TODAY'],
    ['chic-chocs', 'http://www.centreavalanche.qc.ca/conditions/bulletins-avalanche/bulletin-fr'],
    ['glacier', 'http://avalanche.pc.gc.ca/bulletin-eng.aspx?r=3&d=TODAY'],
])

export function getForecastRegionExternalUrl(state, id) {
    const region = getEntityForSchema(state, ForecastRegion, id)
    const properties = region && region.get('properties')

    return properties ?
        properties.get('owner') !== 'avalanche-canada' ?
            properties.get('externalUrl', properties.get('url')) :
            null :
        EXTERNAL_URLS.get(id) || null
}
