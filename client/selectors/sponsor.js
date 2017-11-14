import { createSelector } from 'reselect'
import { getDocumentForUid } from 'getters/prismic'
import { getSponsors } from 'getters/sponsors'

export const getSponsorUid = createSelector(
    getSponsors,
    (state, props) => props.name,
    (sponsors, name) => sponsors[name] || name
)

export default createSelector(
    (state, props) =>
        getDocumentForUid(state, 'sponsor', getSponsorUid(state, props)),
    value => ({ value })
)
