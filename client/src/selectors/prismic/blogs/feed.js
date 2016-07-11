import {createSelector} from 'reselect'
import {getDocumentsOfType} from 'reducers/prismic'
import {BlogPost} from 'prismic/types'
import computeYearOptions from '../computeYearOptions'
import computeCategoryOptions from '../computeCategoryOptions'
import computeTagsOptions from '../computeTagsOptions'
import {options as monthOptions} from '../months'
import getPredicates from '../getPredicates'

function getDocuments(state) {
    return getDocumentsOfType(state, 'blog')
}

// TODO: Fix function getIsFetching
const getIsFetching = createSelector(
    getDocuments,
    feed => feed.isEmpty()
)

const getTransformedFeed = createSelector(
    getDocuments,
    feed => feed.map(post => {
        const data = BlogPost.fromDocument(post)
        const {shortlede, body, previewImage} = data

        return {
            headline: shortlede,
            content: body,
            preview: previewImage,
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
    createSelector(getTransformedFeed, computeCategoryOptions),
    function computeFeedProps(feed, isFetching, predicates, yearOptions, tagOptions, categoryOptions) {
        return {
            content: predicates.reduce((feed, predicate) => feed.filter(predicate), feed),
            message: isFetching ? 'Loading blog feed...' : null,
            yearOptions,
            monthOptions,
            tagOptions,
            categoryOptions,
        }
    }
)
