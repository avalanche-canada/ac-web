import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'getters/prismic'
import factory from 'prismic/factory'

function getType(state, {type}) {
    return type
}
function getDocument(state, props) {
    const {params: {uid}, type} = props

    return getDocumentForUid(state, type, uid)
}

export default createSelector(
    getType,
    getIsFetching,
    getDocument,
    function computePostProps(type, isFetching, post) {
        if (isFetching) {
            return {
                isFetching,
                message: `Loading the ${type} post...`,
            }
        }

        if (!post) {
            return {
                message: `No ${type} found.`
            }
        }

        return {
            isFetching,
            post: factory.getType(post),
        }
    }
)
