import {createSelector} from 'reselect'
import {getIsFetching, getDocumentsOfType} from 'reducers/prismic'
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
    (name, reports, isFetching) => {
        const report = reports.find(report => report.name === name)

        return {
            report,
            messages,
            isLoading: isFetching && !report,
        }
    }
)
