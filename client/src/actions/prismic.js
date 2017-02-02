import Immutable from 'immutable'
import {createAction} from 'redux-actions'
import noop from 'lodash/noop'
import {getDocumentsOfType, getDocumentForUid, hasDocumentForUid, getResults} from 'getters/prismic'
import {Api as Prismic, Predicates} from 'prismic'

export const GET_PRISMIC = 'GET_PRISMIC'

function convertParams(params = {}) {
    const {type, uid, id, options = {}, predicates = []} = params
    let predicate

    if (id) {
        predicate = Predicates.at('document.id', id)
    } else if (uid && type) {
        predicate = Predicates.at(`my.${type}.uid`, uid)
    } else if (type) {
        predicate = Predicates.at('document.type', type)
    }

    if (predicate) {
        const query = Predicates.toQuery(predicate)

        // To make sure we do not two identical predicate
        if (!predicates.find(predicate => Predicates.toQuery(predicate) === query)) {
            predicates.push(predicate)
        }
    }

    return {
        predicates,
        options,
    }
}

export function paramsToKey(params) {
    const {predicates, options} = convertParams(params)

    return Immutable.fromJS({
        predicates: predicates.map(Predicates.toQuery),
        options,
    }).hashCode()
}

export function load(params = {}) {
    return (dispatch, getState) => {
        const state = getState()
        const results = getResults(state)
        const key = paramsToKey(params)

        if (results.has(key)) {
            const {isFetching, isLoaded} = results.get(key)

            if (isFetching || isLoaded) {
                return Promise.resolve()
            }
        } else {
            const {type, uid} = params

            if (hasDocumentForUid(state, type, uid)) {
                return Promise.resolve()
            }
        }

        const {predicates, options} = convertParams(params)

        return dispatch({
            type: GET_PRISMIC,
            payload: Prismic.Query(predicates, options),
            meta: {
                key,
                predicates,
                options,
            }
        }).then(response => response.value)
    }
}

export function loadHotZoneReport({name, uid}) {
    return (dispatch, getState) => {
        const state = getState()

        if (typeof uid === 'string') {
            return dispatch(load({
                type: 'hotzone-report',
                uid
            }))
        } else if (typeof name === 'string') {
            const documents = getDocumentsOfType(state, 'hotzone-report')
            const key = 'hotzone-report.region'
            function finder(document) {
                return document.data[key].value === name
            }

            if (!documents.find(finder)) {
                return dispatch(load({
                    type: 'hotzone-report',
                    predicates: [
                        Predicates.at('my.hotzone-report.region', name)
                    ]
                }))
            }
        }
    }
}
