import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'reducers/prismic'
import {BlogPost} from 'prismic/types'

const type = 'blog'

export function transform(blog) {
    const {shortlede, body, previewImage, uid} = blog

    return {
        headline: shortlede,
        content: body,
        preview: previewImage,
        link: `blogs/${uid}`,
        ...blog
    }
}

export function parse(blog) {
    return BlogPost.fromDocument(blog)
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
                message: 'Loading the blog post...'
            }
        }

        return {
            post: transform(parse(post))
        }
    }
)
