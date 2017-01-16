import {createSelector, createStructuredSelector} from 'reselect'
import {getDocumentForUid} from 'getters/prismic'
import Parser from 'prismic/parser'

const getTutorialContent = createSelector(
    (state, {uid}) => getDocumentForUid(state, 'weather-forecast-tutorial', uid),
    document => document ? Parser.parse(document).tutorial : null,
)

const getStatus = createSelector(
    (state, props) => props.status,
    (status, messages) => status.set('messages', {
        loading: 'Loading tutorial...',
        error: 'Error happened while loading tutorial...',
    })
)

export default createStructuredSelector({
    body: getTutorialContent,
    status: getStatus,
})
