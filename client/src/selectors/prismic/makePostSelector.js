import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'reducers/prismic'

export default function makePostSelector(type, transform) {
    function getDocument(state, props) {
        const {uid} = props.params

        return getDocumentForUid(state, type, uid)
    }

    return createSelector(
        getIsFetching,
        getDocument,
        function computePostProps(isFetching, post) {
            if (isFetching && !post) {
                return {
                    isFetching,
                    message: `Loading the ${type} post...`,
                }
            }

            return {
                isFetching,
                post: transform(post),
            }
        }
    )
}
