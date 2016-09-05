import computeYearOptions from 'selectors/prismic/computeYearOptions'
import computeTagsOptions from 'selectors/prismic/computeTagsOptions'
import {options as monthOptions} from 'selectors/prismic/months'
import {NewsPost} from 'prismic/types'
import makeFeedSelector from 'selectors/prismic/makeFeedSelector'
import makePostSelector from 'selectors/prismic/makePostSelector'
import makeSplashSelector from 'selectors/prismic/makeSplashSelector'

const TYPE = 'news'

function transform(post) {
    if (!post) {
        return
    }

    post = NewsPost.fromDocument(post)
    const {shortlede, body, featuredImage, uid} = post

    return {
        headline: shortlede,
        content: body,
        preview: featuredImage,
        link: `${TYPE}/${uid}`,
        ...post
    }
}

function makeOptionsSelectors(getFeed) {
    return (state, props) => {
        const feed = getFeed(state, props)

        return {
            monthOptions,
            yearOptions: computeYearOptions(feed),
            tagOptions: computeTagsOptions(feed),
        }
    }
}

export const post = makePostSelector(TYPE, transform)
export const feed = makeFeedSelector(TYPE, transform, makeOptionsSelectors)
export const splash = makeSplashSelector(TYPE, transform)
