import Immutable from 'immutable'
import RESULT from '~/reducers/result'
import {paramsToKey} from '~/actions/prismic'
import transform from '~/prismic/transformers'
import {createSelector} from 'reselect'

const MAP = new Immutable.Map()

export function getDocuments(state) {
    return state.prismic.documents
}

export function getResults(state) {
    return state.prismic.results
}

export function getResult(state, params) {
    return state.prismic.results.get(paramsToKey(params), RESULT)
}

export function getDocumentsOfType(state, type) {
    const ids = state.prismic.ids.get(type, MAP).toMap()
    const {documents} = state.prismic

    return ids.map(id => documents.get(id))
}

export function getDocumentForUid(state, type, uid) {
    const id = getDocumentId(state, type, uid)

    return state.prismic.documents.get(id)
}

export function hasDocumentForUid(state, type, uid) {
    const id = getDocumentId(state, type, uid)

    return state.prismic.documents.has(id)
}

function getDocumentId(state, type, uid) {
    return state.prismic.uids.getIn([type, uid])
}

export function getDocumentFromParams(state, {id, type, uid}) {
    if (!id) {
        id = getDocumentId(state, type, uid)
    }

    return state.prismic.documents.get(id)
}

// TODO: Move that selector out of here, only getters here!  
export const getHighlight = createSelector(
    state => getDocumentsOfType(state, 'highlight').first(),
    highlight => highlight ? transform(highlight) : null
)
