import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import {NewsPost} from 'prismic/types'
import computeYearOptions from '../computeYearOptions'
import computeTagsOptions from '../computeTagsOptions'
import {options as monthOptions} from '../months'
import getPredicates from '../getPredicates'
import {transform, parse} from './post'

function getDocuments(state) {
    return getDocumentsOfType(state, 'news')
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
    createSelector(getTransformedFeed, computeTagsOptions),
    function computeFeedProps(feed, isFetching, predicates, yearOptions, tagOptions) {
        const content = predicates.reduce((feed, predicate) => feed.filter(predicate), feed)
        let message = null

        if (isFetching) {
            message = 'Loading news feed...'
        } else if (content.size === 0) {
            message = 'No news found.'
        }

        return {
            content,
            message,
            yearOptions,
            monthOptions,
            tagOptions,
        }
    }
)
