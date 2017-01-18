import {createSelector} from 'reselect'
import turf from '@turf/helpers'
import {getIsFetching, getDocumentsOfType} from 'getters/prismic'
import parser from 'prismic/parser'
import {computeOffset, computeFitBounds} from 'selectors/map/bounds'
import {parseLocation} from 'prismic/parser'

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
        if (report.locations.length !== 1) {
            return null
        }

        const [location] = report.locations

        return {
            center: parseLocation(location),
            zoom: 7,
            offset: computeOffset(),
        }
    }
)

const getComputeBounds = createSelector(
    getReport,
    computeFitBounds,
    (report, computeBounds) => () => {
        if (report.locations.length === 1) {
            return null
        }

        const coordinates = report.locations.map(parseLocation)

        return computeBounds(
            turf.multiPoint(coordinates),
            undefined,
            undefined, {
                padding: 200
            }
        )
    }
)

export default createSelector(
    getId,
    getReport,
    getStatus,
    getComputeFlyTo,
    getComputeBounds,
    (id, report, status, computeFlyTo, computeBounds) => ({
        report,
        computeFlyTo,
        computeBounds,
        status,
        notAvailable: status.isLoaded && !report ?
            `Special information "${id}" is not available anymore.` :
            null,
    })
)
