import { createSelector } from 'reselect'
import { getDocumentForUid } from '~/getters/prismic'
import { getSponsors } from '~/getters/sponsors'

export const getSponsorUid = createSelector(
    getSponsors,
    (state, props) => props.name,
    (sponsors, name) => {
        console.warn(sponsors, name, sponsors[name])
        return sponsors[name] || name
    }
)

export default createSelector(
    (state, props) =>
        getDocumentForUid(state, 'sponsor', getSponsorUid(state, props)),
    value => ({ value })
)
