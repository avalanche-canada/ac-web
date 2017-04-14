import {createSelector, createStructuredSelector} from 'reselect'
import {getResult as getBaseResult, getDocumentFromParams, getDocuments} from 'getters/prismic'
import parser from '~/prismic/parser'
import transform from '~/prismic/transformers'

export function getType(state, props) {
    return props.params.type
}

export function getUid(state, props) {
    return props.params.uid
}

export function getResult(state, props) {
    return getBaseResult(state, props.params)
}

export function getStatus(state, props) {
    return getBaseResult(state, props.params).asStatus()
}

export function getStatusFactory(getMessages) {
    return createSelector(
        getResult,
        typeof getMessages === 'function' ? getMessages : () => getMessages,
        (result, messages) => result.asStatus(messages)
    )
}

export const getDocument = createSelector(
    (state, props) => getDocumentFromParams(state, props.params),
    document => document ? transform(document) : undefined,
)

export const getDocumentsFromResult = createSelector(
    getDocuments,
    getResult,
    (documents, {ids}) => Array.from(ids)
        .map(id => documents.get(id))
        .filter(Boolean)
        .map(document => transform(document))
)

export const getDocumentFromResult = createSelector(
    getDocumentsFromResult,
    documents => documents.shift()
)

export const getDocumentAndStatus = createStructuredSelector({
    status: getStatus,
    document: getDocument,
})
