import Immutable from 'immutable'
import { getResults } from 'getters/prismic'
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
        const results = getResults(state)
        const key = paramsToKey(params)

        if (results.has(key)) {
            const { isFetching, isLoaded } = results.get(key)

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
                key,
                predicates,
                options,
            },
        }

        return dispatch(action).then(getValue)
    }
}
