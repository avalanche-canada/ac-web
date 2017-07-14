import { createSelector, createStructuredSelector } from 'reselect'
import turf from '@turf/helpers'
import { computeOffset, computeFitBounds } from '~/selectors/map/bounds'
import { parseLocation } from '~/prismic/parsers'
import {
    getStatusFactory,
    getDocument,
    getUid,
} from '~/selectors/prismic/utils'

// TODO: Create a connector, it is really similar to toyota-truck-report

const getComputeFlyTo = createSelector(
    getDocument,
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
    getDocument,
    computeFitBounds,
    (report, computeBounds) => () => {
        if (report.locations.length === 1) {
            return null
        }

        const coordinates = report.locations.map(parseLocation)

        return computeBounds(
            turf.multiPoint(coordinates),
            undefined,
            undefined,
            {
                padding: 200,
            }
        )
    }
)

const getMessages = createSelector(getUid, getDocument, (uid, report) => ({
    isError: 'An error happened while loading the special information.',
    isLoading: 'Loading latest special information...',
    isLoaded: report
        ? null
        : `Special information "${uid}" is not available anymore.`,
}))

export default createStructuredSelector({
    report: getDocument,
    status: getStatusFactory(getMessages),
    computeFlyTo: getComputeFlyTo,
    computeBounds: getComputeBounds,
})
