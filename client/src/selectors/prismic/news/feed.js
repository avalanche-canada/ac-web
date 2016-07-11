import {createSelector} from 'reselect'
import {getDocumentsOfType} from 'reducers/prismic'
import {NewsPost} from 'prismic/types'
import computeYearOptions from '../computeYearOptions'
import computeTagsOptions from '../computeTagsOptions'
import {options as monthOptions} from '../months'
import getPredicates from '../getPredicates'

function getDocuments(state) {
    return getDocumentsOfType(state, 'news')
}

// TODO: Fix function getIsFetching
const getIsFetching = createSelector(
    getDocuments,
    feed => feed.isEmpty()
)

const getTransformedFeed = createSelector(
    getDocuments,
    feed => feed.map(post => {
        const data = NewsPost.fromDocument(post)
        const {shortlede, body, featuredImage} = data

        return {
            headline: shortlede,
            content: body,
            preview: featuredImage,
            ...data
        }
    })
)

export default createSelector(
    getTransformedFeed,
    getIsFetching,
    (state, props) => getPredicates(props.location.query),
    createSelector(getTransformedFeed, computeYearOptions),
    createSelector(getTransformedFeed, computeTagsOptions),
    function computeFeedProps(feed, isFetching, predicates, yearOptions, tagOptions) {
        return {
            content: predicates.reduce((feed, predicate) => feed.filter(predicate), feed),
            message: isFetching ? 'Loading news feed...' : null,
            yearOptions,
            monthOptions,
            tagOptions,
        }
    }
)
