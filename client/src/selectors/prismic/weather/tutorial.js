import {createSelector} from 'reselect'
import {getDocumentForUid, getIsFetching} from 'getters/prismic'
import factory from 'prismic/factory'

function getDocument(state, {uid}) {
    return getDocumentForUid(state, 'weather-forecast-tutorial', uid)
}

export default createSelector(
    getIsFetching,
    getDocument,
    (isFetching, document) => {
        if (isFetching || !document) {
            return {
                isLoading: true,
            }
        }

        return {
            isLoading: false,
            body: document ? factory.getType(document).tutorial : null,
        }
    }
)
