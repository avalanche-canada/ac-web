import {Api as Prismic, Predicates} from 'prismic'
import {
    getDocumentForBookmark,
    getDocumentForUid,
    getDocumentsOfType
} from 'reducers/prismic'

export const PRISMIC_REQUEST = 'PRISMIC_REQUEST'
export const PRISMIC_SUCCESS = 'PRISMIC_SUCCESS'
export const PRISMIC_FAILURE = 'PRISMIC_FAILURE'

export const PRISMIC_API_REQUEST = 'PRISMIC_API_REQUEST'
export const PRISMIC_API_SUCCESS = 'PRISMIC_API_SUCCESS'
export const PRISMIC_API_FAILURE = 'PRISMIC_API_FAILURE'

export const PRISMIC = 'prismic-query'

function createBasePredicate(api, {type, bookmark, uid}) {
    if (bookmark) {
        const id = api.api.bookmarks[bookmark]

        return Predicates.at('document.id', id)
    } else if (uid && type) {
        return Predicates.at(`my.${type}.uid`, uid)
    } else if (type) {
        return Predicates.at('document.type', type)
    } else {
        throw new Error('Not parameters to create predicates.')
    }
}

function isPrismicCallRequired(store, action) {
    const state = store.getState()
    const {bookmark, type, uid} = action.payload

    if (bookmark && !getDocumentForBookmark(state, bookmark)) {
        return true
    }

    if (type && uid && !getDocumentForUid(state, type, uid)) {
        return true
    }

    if (type && getDocumentsOfType(state, type).length === 0) {
        return true
    }

    if (type || uid) {
        return true
    }

    return false
}

const prismic = store => next => action => {
    if (action.type !== PRISMIC) {
        return next(action)
    }

    if (!isPrismicCallRequired(store, action)) {
        return null
    }

    next({
        type: PRISMIC_API_REQUEST,
        meta: action.payload,
    })

    return Prismic.Api().then(
        api => {
            next({
                type: PRISMIC_API_SUCCESS,
                payload: api,
                meta: action.payload,
            })

            return api
        },
        error => {
            const err = new Error('Can not access Avalanche Canada Prismic repository.', error)

            next({
                type: PRISMIC_API_FAILURE,
                payload: err,
                error: true,
                meta: action.payload,
            })

            throw err
        }
    ).then(api => {
        next({
            type: PRISMIC_REQUEST,
            meta: action.payload,
        })

        const {payload} = action
        let {predicates, ...options} = payload.options || {}

        api = api.query(createBasePredicate(api, payload), ...(predicates || []))
        api = Prismic.setOptions(api, options)

        return api.submit().then(
            response => {
                next({
                    type: PRISMIC_SUCCESS,
                    payload: response,
                    meta: action.payload,
                })
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

export default prismic
