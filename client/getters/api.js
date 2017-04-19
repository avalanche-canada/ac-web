import {paramsToKey} from '~/reducers/utils'
import RESULT from '~/reducers/result'
import {getEntityForSchema} from '~/getters/entities'
import {ForecastRegion} from '~/api/schemas'

function path(schema, params) {
    return [schema.key, paramsToKey(params)]
}

export function getResultsSet(state, schema, params) {
    return state.api.results.getIn(path(schema, params), RESULT)
}

export function hasResultsSet(state, schema, params) {
    return state.api.results.hasIn(path(schema, params))
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

const AVCAN = 'avalanche-canada'

// TODO: Move that function to selectors
export function getForecastRegionExternalUrl(state, id) {
    const region = getEntityForSchema(state, ForecastRegion, id)
    const properties = region && region.get('properties')

    return properties ?
        properties.get('owner') !== AVCAN ?
            properties.get('externalUrl', properties.get('url')) :
            null :
        EXTERNAL_URLS.get(id) || null
}
