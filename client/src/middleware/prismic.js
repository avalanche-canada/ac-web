import {Api as Prismic, Predicates} from 'prismic'
import {getDocumentForUid, getDocumentsOfType} from 'reducers/prismic'
import {
    isPrismicAction,
    PRISMIC_REQUEST,
    PRISMIC_SUCCESS,
    PRISMIC_FAILURE
} from 'actions/prismic'

function createBasePredicate({type, uid, id}) {
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

    if (type && uid) {
        return !getDocumentForUid(state, type, uid)
    }

    // TODO: Fix that. We might have loaded just portion of documents for provided type
    if (type) {
        return true
    }

    if (type || uid) {
        return true
    }

    return false
}

function process({payload}, dispatch) {
    dispatch({
        type: PRISMIC_REQUEST,
        meta: payload,
    })

    let {predicates = [], ...options} = payload.options || {}
    predicates = [createBasePredicate(payload), ...predicates]

    let form = Prismic.createForm(API).query(predicates)

    form = Prismic.setOptions(form, options)

    return form.submit().then(
        response => {
            dispatch({
                type: PRISMIC_SUCCESS,
                payload: response,
                meta: payload,
            })

            return response
        },
        error => {
            const err = new Error('Can not fetch prismic documents.', error)

            dispatch({
                type: PRISMIC_FAILURE,
                payload: err,
                error: true,
                meta: payload,
            })

            throw err
        },
    )
}

let API = null
let PROMISE = null

export default store => next => action => {
    if (!isPrismicAction(action)) {
        return next(action)
    }

    if (!isPrismicCallRequired(store, action)) {
        return Promise.resolve()
    }

    if (!PROMISE) {
        PROMISE = Prismic.Api().then(api => {
            API = api
        })
    }

    if (API) {
        return process(action, next)
    } else {
        return PROMISE.then(() => process(action, next))
    }
}
