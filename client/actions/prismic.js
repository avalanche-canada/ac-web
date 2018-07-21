import Immutable from 'immutable'
import { hasResult, getResult, hasDocumentForUid } from 'getters/prismic'
import { Api as Prismic, Predicates } from 'prismic'

export const GET_PRISMIC = 'GET_PRISMIC'

const { toQuery } = Predicates

export function paramsToKey({ predicates, options }) {
    return Immutable.fromJS({
        predicates: predicates.map(toQuery),
        options,
    }).hashCode()
}

function getValue({ value }) {
    return value
}

export function load(params = {}) {
    return (dispatch, getState) => {
        const state = getState()

        if (hasResult(state, params)) {
            const { isFetching, isLoaded } = getResult(state, params)

            if (isFetching || isLoaded) {
                // FIXME: Return the documents
                return Promise.resolve()
            }
        }

        const { predicates, options } = params
        const action = {
            type: GET_PRISMIC,
            payload: Prismic.Query(predicates, options),
            meta: {
                key: paramsToKey(params),
                predicates,
                options,
            },
        }

        return dispatch(action).then(getValue)
    }
}

export function loadForUid(type, uid, lang) {
    return (dispatch, getState) => {
        const state = getState()

        if (!hasDocumentForUid(state, type, uid)) {
            const params = {
                predicates: [Predicates.uid(type, uid)],
            }

            if (lang) {
                params.options = {
                    ...(params.options || {}),
                    lang,
                }
            }

            dispatch(load(params))
        }
    }
}
