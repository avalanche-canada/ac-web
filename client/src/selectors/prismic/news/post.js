import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'reducers/prismic'
import {NewsPost} from 'prismic/types'

const type = 'news'

export function transform(post) {
    if (!post) {
        return
    }

    const {shortlede, body, featuredImage, uid} = post

    return {
        headline: shortlede,
        content: body,
        preview: featuredImage,
        link: `${type}/${uid}`,
        ...post
    }
}

export function parse(post) {
    return NewsPost.fromDocument(post)
}

function getDocument(state, props) {
    const {uid} = props.params

    return getDocumentForUid(state, type, uid)
}

export default createSelector(
    getIsFetching,
    getDocument,
    function computePostProps(isFetching, post) {
        if (isFetching && !post) {
            return {
                isFetching,
                message: 'Loading the news post...',
            }
        }

        return {
            isFetching,
            post: transform(parse(post)),
        }
    }
)
