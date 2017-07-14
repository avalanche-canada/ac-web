import { createSelector, createStructuredSelector } from 'reselect'
import {
    getResult as getBaseResult,
    getDocumentFromParams,
    getDocuments,
} from '~/getters/prismic'

export function getType(state, props) {
    return props.params.type
}

export function getUid(state, props) {
    return props.params.uid
}

export function getResult(state, props) {
    return getBaseResult(state, props.params)
}

export function makeGetStatus() {
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

export function makeGetDocumentAndStatus() {
    return createStructuredSelector({
        status: makeGetStatus(),
        document: getDocument,
    })
}
