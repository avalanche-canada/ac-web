import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import computeYearOptions from '../computeYearOptions'
import computeCategoryOptions from '../computeCategoryOptions'
import computeTagsOptions from '../computeTagsOptions'
import {options as monthOptions} from '../months'
import getPredicates from '../getPredicates'
import {transform, parse} from './post'

function getDocuments(state) {
    return getDocumentsOfType(state, 'blog')
}

const getTransformedFeed = createSelector(
    getDocuments,
    feed => feed.map(parse).map(transform),
)

export default createSelector(
    getTransformedFeed,
    getIsFetching,
    (state, props) => getPredicates(props.location.query),
    createSelector(getTransformedFeed, computeYearOptions),
    createSelector(getTransformedFeed, computeTagsOptions),
    createSelector(getTransformedFeed, computeCategoryOptions),
    function computeFeedProps(feed, isFetching, predicates, yearOptions, tagOptions, categoryOptions) {
        const content = predicates.reduce((feed, predicate) => feed.filter(predicate), feed)
        let message = null

        if (isFetching) {
            message = 'Loading blogs feed...'
        } else if (content.size === 0) {
            message = 'No blogs found.'
        }

        return {
            content,
            message,
            yearOptions,
            monthOptions,
            tagOptions,
            categoryOptions,
        }
    }
)
