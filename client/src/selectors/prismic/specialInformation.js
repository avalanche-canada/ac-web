import {createSelector} from 'reselect'
import {getIsFetching, getDocumentsOfType} from 'getters/prismic'
import parser from 'prismic/parser'
import {computeOffset} from 'selectors/map/bounds'

// TODO: Create a connector, it is really similar to toyota-truck-report

function getId(state, props) {
    return props.id
}

const getReports = createSelector(
    state => getDocumentsOfType(state, 'special-information'),
    documents => documents.map(document => parser.parse(document)),
)

const getReport = createSelector(
    getReports,
    getId,
    (reports, id) => reports.find(report => report.uid === id)
)

function getStatus(state, {isLoading, isLoaded, isError}) {
    return {
        isLoading,
        isLoaded,
        isError,
        messages: {
            error: 'An error happened while loading the special information.',
            loading: 'Loading latest special information...',
        },
    }
}
const getComputeFlyTo = createSelector(
    getReport,
    computeOffset,
    (report, computeOffset) => () => {
        const props = {
            center: null,
            zoom: 7,
            offset: computeOffset(),
        }

        if (report) {
            const {latitude, longitude} = report.position

            Object.assign(props, {
                center: [longitude, latitude],
            })
        }

        return props
    }
)

export default createSelector(
    getId,
    getReport,
    getStatus,
    getComputeFlyTo,
    (id, report, status, computeFlyTo) => ({
        report,
        computeFlyTo,
        status,
        notAvailable: status.isLoaded && !report ?
            `Special information "${id}" is not available anymore.` :
            null,
    })
)
