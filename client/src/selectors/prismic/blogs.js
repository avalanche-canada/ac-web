import {BlogPost} from 'prismic/types'
import computeYearOptions from 'selectors/prismic/computeYearOptions'
import computeCategoryOptions from 'selectors/prismic/computeCategoryOptions'
import computeTagsOptions from 'selectors/prismic/computeTagsOptions'
import {options as monthOptions} from 'selectors/prismic/months'
import makePostSelector from 'selectors/prismic/makePostSelector'
import makeFeedSelector from 'selectors/prismic/makeFeedSelector'
import makeSplashSelector from 'selectors/prismic/makeSplashSelector'

const TYPE = 'blog'

function makeOptionsSelectors(getFeed) {
    return (state, props) => {
        const feed = getFeed(state, props)

        return {
            monthOptions,
            yearOptions: computeYearOptions(feed),
            tagOptions: computeTagsOptions(feed),
            categoryOptions: computeCategoryOptions(feed),
        }
    }
}

function transform(blog) {
    if (!blog) {
        return
    }

    blog = BlogPost.fromDocument(blog)
    const {shortlede, body, previewImage, uid} = blog

    return {
        headline: shortlede,
        content: body,
        preview: previewImage,
        link: `${TYPE}s/${uid}`,
        ...blog
    }
}

export const post = makePostSelector(TYPE, transform)
export const feed = makeFeedSelector(TYPE, transform, makeOptionsSelectors)
export const splash = makeSplashSelector(TYPE, transform, makeOptionsSelectors)
