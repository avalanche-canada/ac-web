import {createSelector} from 'reselect'
import {getDocumentForUid} from 'reducers/prismic'
import {NewsPost} from 'prismic/types'

function getDocument(state, props) {
    const {uid} = props.params

    return getDocumentForUid(state, 'news', uid)
}

const getIsFetching = createSelector(
    getDocument,
    document => !document
)

const getTransformedPost = createSelector(
    getDocument,
    document => document && NewsPost.fromDocument(document)
)

export default createSelector(
    getIsFetching,
    getTransformedPost,
    function computePostProps(isFetching, post) {
        if (isFetching && !post) {
            return {
                message: 'Loading the news post...'
            }
        }

        return {
            post
        }
    }
)
