import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import {EventPost} from 'prismic/types'
import computeYearOptions from '../computeYearOptions'
import computeCategoryOptions from '../computeCategoryOptions'
import {options as monthOptions} from '../months'
import getPredicates from '../getPredicates'
import {transform, parse} from './post'

const type = 'event'

function getDocuments(state) {
    return getDocumentsOfType(state, type)
}

const getTransformedFeed = createSelector(
    getDocuments,
    feed => feed.map(parse).map(transform)
)

export default createSelector(
    getTransformedFeed,
    getIsFetching,
    (state, props) => getPredicates(props.location.query),
    createSelector(getTransformedFeed, computeYearOptions),
    createSelector(getTransformedFeed, computeCategoryOptions),
    function computeFeedProps(feed, isFetching, predicates, yearOptions, categoryOptions) {
        const content = predicates.reduce((feed, predicate) => feed.filter(predicate), feed)
        let message = null

        if (isFetching) {
            message = 'Loading events feed...'
        } else if (content.size === 0) {
            message = 'No events found.'
        }

        return {
            content,
            message,
            yearOptions,
            monthOptions,
            categoryOptions,
        }
    }
)
