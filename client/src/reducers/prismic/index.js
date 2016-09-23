import {combineReducers} from 'redux'
import {createSelector} from 'reselect'
import {Map, Set} from 'immutable'
import {
    PRISMIC_REQUEST,
    PRISMIC_SUCCESS,
    PRISMIC_FAILURE,
} from 'middleware/prismic'

const MAP = new Map()

function fetchingCounter(state = 0, {type}) {
    switch (type) {
        case PRISMIC_REQUEST:
            return state + 1
        case PRISMIC_SUCCESS:
        case PRISMIC_FAILURE:
            return state - 1
        default:
            return state
    }
}

function documents(state = new Map(), {type, payload}) {
    if (type !== PRISMIC_SUCCESS) {
        return state
    }

    return state.withMutations(state => {
        payload.results.forEach(document => {
            const {type, id} = document

            if (!state.has(type)) {
                state.set(type, new Map([[id, document]]))
            } else {
                // Take advantage of new id means another document version.
                // TODO: Look for uid, if already there, old id and document should be removed.
                if (!state.hasIn([type, id])) {
                    state.setIn([type, id], document)
                }
            }
        })
    })
}

function uids(state = new Map(), {type, payload}) {
    if (type !== PRISMIC_SUCCESS) {
        return state
    }

    return state.withMutations(state => {
        payload.results.forEach(({type, uid, id}) => {
            if (!uid) {
                return
            }

            if (!state.has(type)) {
                state.set(type, new Map([[uid, id]]))
            } else {
                state.setIn([type, uid], id)
            }
        })
    })
}

export default combineReducers({
    fetchingCounter,
    documents,
    uids,
})

// Getters
// TODO: Move to a getters file
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
