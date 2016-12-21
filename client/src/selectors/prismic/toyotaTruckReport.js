import {createSelector} from 'reselect'
import {getIsFetching, getDocumentsOfType} from 'getters/prismic'
import parser from 'prismic/parser'

const messages = {
    error: 'An error happened while loading our latest Toyota truck report.',
    loading: 'Loading latest our Toyota truck report...',
}

const getReports = createSelector(
    state => getDocumentsOfType(state, 'toyota-truck-report'),
    documents => documents.map(document => parser.parse(document)),
)

export default createSelector(
    (state, props) => props.id,
    getReports,
    getIsFetching,
    (id, reports, isFetching) => {
        const report = reports.find(report => report.uid === id)

        return {
            report,
            messages,
            isLoading: isFetching && !report,
        }
    }
)
