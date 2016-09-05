import {EventPost} from 'prismic/types'
import computeYearOptions from 'selectors/prismic/computeYearOptions'
import computeCategoryOptions from 'selectors/prismic/computeCategoryOptions'
import {options as monthOptions} from 'selectors/prismic/months'
import makePostSelector from 'selectors/prismic/makePostSelector'
import makeFeedSelector from 'selectors/prismic/makeFeedSelector'
import makeSplashSelector from 'selectors/prismic/makeSplashSelector'

const TYPE = 'event'

function transform(event) {
    if (!event) {
        return
    }

    event = EventPost.fromDocument(event)
    const {shortlede, body, featuredImage, uid} = event

    return {
        headline: shortlede,
        content: body,
        preview: featuredImage,
        link: `${TYPE}s/${uid}`,
        ...event
    }
}

function makeOptionsSelectors(getFeed) {
    return (state, props) => {
        const feed = getFeed(state, props)

        return {
            monthOptions,
            yearOptions: computeYearOptions(feed),
            categoryOptions: computeCategoryOptions(feed),
        }
    }
}

export const post = makePostSelector(TYPE, transform)
export const feed = makeFeedSelector(TYPE, transform, makeOptionsSelectors)
export const splash = makeSplashSelector(TYPE, transform)
