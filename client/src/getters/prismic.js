import {Map} from 'immutable'

const MAP = new Map()

export function getDocumentsOfType(state, type) {
    return state.prismic.documents.get(type, MAP)
}

export function getDocumentForUid(state, type, uid) {
    const {uids, documents} = state.prismic
    const id = uids.getIn([type, uid])

    return documents.getIn([type, id])
}

export function getIsFetching(state) {
    return state.prismic.fetchingCounter > 0
}
