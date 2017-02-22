import {createSelector, createStructuredSelector} from 'reselect'
import {computeOffset} from 'selectors/map/bounds'
import {parseLocation} from 'prismic/parser'
import {getStatusFactory, getDocument, getUid} from 'selectors/prismic/utils'

// TODO: Create a connector, it is really similar to special-information
// TODO: Move to index!

const getComputeFlyTo = createSelector(
    getDocument,
    computeOffset,
    (accident, computeOffset) => () => {
        if (!accident.location) {
            return null
        }

        return {
            center: parseLocation(accident),
            zoom: 9,
            offset: computeOffset(),
        }
    }
)

const getMessages = createSelector(
    getUid,
    getDocument,
    (uid, report) => ({
        isError: 'An error happened while loading the fatal accident.',
        isLoading: 'Loading fatal accident...',
        isLoaded: report ? null : `Fatal accident "${uid}" is not available anymore.`
    })
)

export default createStructuredSelector({
    report: getDocument,
    status: getStatusFactory(getMessages),
    computeFlyTo: getComputeFlyTo,
})
