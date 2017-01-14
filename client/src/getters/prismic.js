import {Map} from 'immutable'

const MAP = new Map()

export function getDocuments(state) {
    return state.prismic.documents
}

export function getDocumentsOfType(state, type) {
    return getDocuments(state).get(type, MAP)
}

export function getDocumentForUid(state, type, uid) {
    const path = [type, getDocumentId(state, type, uid)]

    return getDocuments(state).getIn(path)
}

export function hasDocumentForUid(state, type, uid) {
    const path = [type, getDocumentId(state, type, uid)]

    return getDocuments(state).hasIn(path)
}

export function getIsFetching(state) {
    return state.prismic.fetchingCounter > 0
}

function getDocumentId({prismic}, type, uid) {
    return prismic.uids.getIn([type, uid])
}
