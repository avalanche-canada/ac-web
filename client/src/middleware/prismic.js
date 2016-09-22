import {createAction} from 'redux-actions'
import {Api as Prismic, Predicates} from 'prismic'
import {
    getDocument,
    getDocumentForUid,
    getDocumentsOfType
} from 'reducers/prismic'

export const PRISMIC_REQUEST = 'PRISMIC_REQUEST'
export const PRISMIC_SUCCESS = 'PRISMIC_SUCCESS'
export const PRISMIC_FAILURE = 'PRISMIC_FAILURE'

const PRISMIC = Symbol('prismic-query')

export function createPrismicAction(payloadCreator) {
    return createAction(PRISMIC, payloadCreator)
}

function createBasePredicate({api}, {type, uid, id}) {
    if (id) {
        return Predicates.at('document.id', id)
    } else if (uid && type) {
        return Predicates.at(`my.${type}.uid`, uid)
    } else if (type) {
        return Predicates.at('document.type', type)
    } else {
        throw new Error('Not enough parameters to create base predicate.')
    }
}

function isPrismicCallRequired(store, action) {
    // TODO: Should be purely based on generated predicates...
    // using results set like in normlizr
    const state = store.getState()
    const {type, uid, id} = action.payload

    if (id && !getDocument(state, id)) {
        return true
    }

    if (type && uid && !getDocumentForUid(state, type, uid)) {
        return true
    }

    if (type && getDocumentsOfType(state, type).size === 0) {
        return true
    }

    if (type || uid) {
        return true
    }

    return false
}

export default store => next => action => {
    if (action.type !== PRISMIC) {
        return next(action)
    }

    if (!isPrismicCallRequired(store, action)) {
        return Promise.resolve()
    }

    return Prismic.Api().then(api => {
        next({
            type: PRISMIC_REQUEST,
            meta: action.payload,
        })

        const {payload} = action
        let {predicates = [], ...options} = payload.options || {}

        api = api.query(createBasePredicate(api, payload), ...predicates)
        api = Prismic.setOptions(api, options)

        return api.submit().then(
            response => {
                next({
                    type: PRISMIC_SUCCESS,
                    payload: response,
                    meta: action.payload,
                })

                return response
            },
            error => {
                const err = new Error('Can not fetch prismic documents.', error)

                next({
                    type: PRISMIC_FAILURE,
                    payload: err,
                    error: true,
                    meta: action.payload,
                })

                throw err
            },
        )
    })
}
