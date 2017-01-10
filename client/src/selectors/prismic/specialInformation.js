import {createSelector} from 'reselect'
import {getIsFetching, getDocumentsOfType} from 'getters/prismic'
import parser from 'prismic/parser'

// TODO: Create connector, similar to toyota-truck-report

const messages = {
    error: 'An error happened while loading the special information.',
    loading: 'Loading latest special information...',
}

const getReports = createSelector(
    state => getDocumentsOfType(state, 'special-information'),
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
