import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {
    PRISMIC_REQUEST,
    PRISMIC_SUCCESS,
    PRISMIC_FAILURE,
    PRISMIC_API_REQUEST,
    PRISMIC_API_SUCCESS,
    PRISMIC_API_FAILURE,
} from 'middleware/prismic'

function fetchingCounter(state = 0, {type}) {
    switch (type) {
        case PRISMIC_API_REQUEST:
        case PRISMIC_REQUEST:
            return state + 1
        case PRISMIC_API_SUCCESS:
        case PRISMIC_API_FAILURE:
        case PRISMIC_SUCCESS:
        case PRISMIC_FAILURE:
            return state - 1
        default:
            return state
    }
}

function documents(state = new Immutable.Map(), {type, payload}) {
    if (type !== PRISMIC_SUCCESS) {
        return state
    }

    return state.withMutations(map => {
        payload.results.forEach(document => {
            map.set(document.id, document)
        })
    })
}

function bookmarks(state = new Immutable.Map(), {type, payload}) {
    if (type !== PRISMIC_API_SUCCESS) {
        return state
    }

    return state.merge(payload.api.bookmarks)
}

function types(state = new Immutable.Map(), {type, payload}) {
    if (type !== PRISMIC_SUCCESS) {
        return state
    }

    return state.withMutations(map => {
        payload.results.forEach(({type, id}) => {
            const ids = map.get(type, new Immutable.Set())

            map.set(type, ids.add(id))
        })
    })
}

function uids(state = new Immutable.Map(), {type, payload}) {
    if (type !== PRISMIC_SUCCESS) {
        return state
    }

    return state.withMutations(map => {
        payload.results.forEach(({type, uid, id}) => {
            if (!uid) {
                return
            }

            const uids = map.get(type, new Immutable.Map())

            map.set(type, uids.set(uid, id))
        })
    })
}

export default combineReducers({
    fetchingCounter,
    documents,
    bookmarks,
    types,
    uids,
})

export function getDocuments(state) {
    return state.prismic.documents
}

export function getDocument(state, id) {
    return state.prismic.documents.get(id)
}

export function getDocumentsOfType(state, type) {
    const {documents, types} = state.prismic
    const set = types.get(type, new Immutable.Set())

    return new Immutable.Map(set.map(id => [id, documents.get(id)]))
}

export function getDocumentForBookmark(state, bookmark) {
    const {bookmarks, documents} = state.prismic

    return documents.get(bookmarks.get(bookmark))
}

export function hasDocumentForBookmark(state, bookmark) {
    const {bookmarks, documents} = state.prismic

    return documents.has(bookmarks.get(bookmark))
}

export function getDocumentForUid(state, type, uid) {
    const {uids, documents} = state.prismic
    const id = uids.getIn([type, uid])

    return documents.get(id)
}

export function getDocumentForParams(state, {id, type, uid, bookmark}) {
    if (bookmark) {
        return getDocumentForBookmark(state, bookmark)
    } else if (id) {
        return getDocument(state, id)
    } else if (type && uid) {
        return getDocumentForUid(state, type, uid)
    }
}

export function getIsFetching(state) {
    return state.prismic.fetchingCounter > 0
}
