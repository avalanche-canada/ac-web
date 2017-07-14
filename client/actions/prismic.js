import Immutable from 'immutable'
import {
    getDocumentsOfType,
    hasDocumentForUid,
    hasDocumentForId,
    getResults,
} from '~/getters/prismic'
import { Api as Prismic, Predicates } from '~/prismic'

export const GET_PRISMIC = 'GET_PRISMIC'

const { toQuery } = Predicates

function convertParams(params = {}) {
    const { type, uid, id, options = {}, predicates = [] } = params
    let predicate

    if (id) {
        predicate = Predicates.id(id)
    } else if (uid && type) {
        predicate = Predicates.uid(type, uid)
    } else if (type) {
        predicate = Predicates.type(type)
    }

    if (predicate) {
        const query = toQuery(predicate)

        // To make sure we do not two identical predicate
        if (predicates.every(predicate => toQuery(predicate) !== query)) {
            predicates.push(predicate)
        }
    }

    return {
        predicates,
        options,
    }
}

export function paramsToKey(params) {
    const { predicates, options } = convertParams(params)

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
        const { id, type, uid } = params

        if (hasDocumentForId(state, id)) {
            // FIXME: Return the document
            return Promise.resolve()
        }

        if (hasDocumentForUid(state, type, uid)) {
            // FIXME: Return the document
            return Promise.resolve()
        }

        if (results.has(key)) {
            const { isFetching, isLoaded } = results.get(key)

            if (isFetching || isLoaded) {
                // FIXME: Return the documents
                return Promise.resolve()
            }
        }

        const { predicates, options } = convertParams(params)
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

export function loadHotZoneReport({ name, uid }) {
    // TODO: Modify to use the prismic function, should use existing function instead
    const type = 'hotzone-report'

    return (dispatch, getState) => {
        const state = getState()

        if (typeof uid === 'string') {
            return dispatch(
                load({
                    type,
                    uid,
                })
            )
        } else if (typeof name === 'string') {
            const documents = getDocumentsOfType(state, type)
            const isNotLoaded = document =>
                document.data[type].region.value !== name

            if (documents.every(isNotLoaded)) {
                return dispatch(
                    load({
                        type,
                        predicates: [Predicates.field(type, 'region', name)],
                    })
                )
            }
        }

        return Promise.resolve()
    }
}
