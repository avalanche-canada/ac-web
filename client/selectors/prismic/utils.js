import { createSelector, createStructuredSelector } from 'reselect'
import {
    getResult as getResultFromParams,
    getDocumentFromParams,
    getDocuments,
} from '~/getters/prismic'

function makeParams(params, props) {
    return typeof params === 'function' ? params(props) : params
}

export function getType(state, props) {
    return props.params.type
}

export function getUid(state, props) {
    return props.params.uid
}

export function getResult(state, props) {
    return getResultFromParams(state, props.params)
}

export function makeGetStatus(params) {
    if (params) {
        return (state, props) =>
            getResultFromParams(state, makeParams(params, props))
    }

    return createSelector(getResult, result => result.asStatus())
}

export function getStatusFactory(getMessages) {
    return createSelector(
        getResult,
        typeof getMessages === 'function' ? getMessages : () => getMessages,
        (result, messages) => result.asStatus(messages)
    )
}

export function getDocument(state, props) {
    return getDocumentFromParams(state, props.params)
}

function makeGetDocument(params) {
    return (state, props) =>
        getDocumentFromParams(state, makeParams(params, props))
}

export const getDocumentsFromResult = createSelector(
    getDocuments,
    getResult,
    (documents, { ids }) =>
        Array.from(ids).map(id => documents.get(id)).filter(Boolean)
)

// TODO: Rewrite that so it does not create a new document all the time
export const getDocumentFromResult = createSelector(
    getDocumentsFromResult,
    documents => documents.shift()
)

export function makeGetDocumentAndStatus(params) {
    return createStructuredSelector({
        status: makeGetStatus(params),
        document: makeGetDocument(params),
    })
}
