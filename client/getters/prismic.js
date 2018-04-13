import Immutable from 'immutable'
import RESULT from 'reducers/result'
import { paramsToKey } from 'actions/prismic'

const MAP = new Immutable.Map()

export function getResults(state) {
    return state.prismic.results
}

export function getResult(state, params) {
    return getResults(state).get(paramsToKey(params), RESULT)
}

export function getDocumentsOfType(state, type) {
    const ids = state.prismic.ids.get(type, MAP).toMap()
    const { documents } = state.prismic

    return ids.map(id => documents.get(id))
}

export function getDocumentForUid(state, type, uid) {
    const id = getDocumentId(state, type, uid)

    return state.prismic.documents.get(id)
}

export function hasDocumentForUid(state, type, uid) {
    const id = getDocumentId(state, type, uid)

    return hasDocumentForId(state, id)
}

export function hasDocumentForId(state, type, id) {
    return state.prismic.documents.has(id)
}

function getDocumentId(state, type, uid) {
    return state.prismic.uids.getIn([type, uid])
}

export function getDocumentFromParams(state, params) {
    const result = getResult(state, params)
    const [id] = Array.from(result.ids)

    return state.prismic.documents.get(id)
}

export function getDocumentsFromParams(state, params) {
    const result = getResult(state, params)
    const { ids } = result
    const { documents } = state.prismic

    return Array.from(ids).map(id => documents.get(id))
}
