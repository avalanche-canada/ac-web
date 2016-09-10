import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'

export default function makeSplashSelector(type, transform) {
    const getFeatured = createSelector(
        state => getDocumentsOfType(state, type),
        featured => transform(featured)
    )
    const getTransformedFeed = createSelector(
        state => getDocumentsOfType(state, type),
        feed => feed.map(transform)
    )

    return createSelector(
        getFeatured,
        getTransformedFeed,
        getIsFetching,
        function computeFeedProps(featured, feed, isFetching) {
            let message = null

            if (isFetching) {
                message = `Loading ${type} feed...`
            } else if (content.size === 0) {
                message = `No ${type} found.`
            }

            return {
                featured,
                feed,
                message,
            }
        }
    )
}
