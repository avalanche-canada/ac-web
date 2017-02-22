import {createSelector} from 'reselect'
import {getDocumentForUid} from 'getters/prismic'
import transform from 'prismic/transformers'
import {getSponsors, getActiveSponsor} from 'getters/sponsors'

const EMPTY = {}

export const getSponsorUid = createSelector(
    getSponsors,
    getActiveSponsor,
    (sponsors, page) => sponsors[page] || page
)

export default createSelector(
    state => getDocumentForUid(state, 'sponsor', getSponsorUid(state)),
    document => transform(document) || EMPTY
)
