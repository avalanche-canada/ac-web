import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'reducers/prismic'
import {EventPost} from 'prismic/types'

const type = 'event'

export function transform(event) {
    const {shortlede, body, featuredImage, uid} = event

    return {
        headline: shortlede,
        content: body,
        preview: featuredImage,
        link: `${type}s/${uid}`,
        ...event
    }
}

export function parse(post) {
    return EventPost.fromDocument(post)
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
                message: 'Loading the event post...'
            }
        }

        return {
            post: transform(parse(post))
        }
    }
)
