import { createSelector } from 'reselect'
import { getDocumentForUid } from '~/getters/prismic'
import { parse } from '~/prismic'
import { getSponsors, getActiveSponsor } from '~/getters/sponsors'

export const getSponsorUid = createSelector(
    getSponsors,
    getActiveSponsor,
    (sponsors, page) => sponsors[page] || page
)

export default createSelector(
    state => getDocumentForUid(state, 'sponsor', getSponsorUid(state)),
    parse
)
