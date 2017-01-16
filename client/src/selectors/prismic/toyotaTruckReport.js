import {createSelector, createStructuredSelector} from 'reselect'
import {getIsFetching, getDocumentForUid} from 'getters/prismic'
import Parser from 'prismic/parser'
import Status from 'utils/status'

let status = new Status({
    messages: {
        isError: 'An error happened while loading our latest Toyota truck report.',
        isLoading: 'Loading latest our Toyota truck report...',
    }
})

const getReport = createSelector(
    (state, {id}) => getDocumentForUid(state, 'toyota-truck-report', id),
    document => document ? Parser.parse(document) : undefined
)

const getStatus = createSelector(
    getIsFetching,
    getReport,
    (isFetching, report) => isFetching && !report ? status.start() : status.fulfill()
)

export default createStructuredSelector({
    report: getReport,
    status: getStatus,
})
