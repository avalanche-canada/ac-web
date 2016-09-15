import {createSelector} from 'reselect'
import {getDocumentForUid} from 'reducers/prismic'
import {Sponsor} from 'prismic/types'
import {getSponsors, getActiveSponsor} from 'reducers/sponsors'

function transform({image, name, url}) {
    return {
        name,
        url,
        src: image
    }
}

function getSponsorUid(state) {
    const sponsors = getSponsors(state)
    const page = getActiveSponsor(state)

    return sponsors[page] || null
}

const getSponsor = createSelector(
    state => state,
    getSponsorUid,
    (state, uid) => getDocumentForUid(state, 'sponsor', uid)
)

export default createSelector(
    getSponsorUid,
    getSponsor,
    (uid, sponsor) => ({
        uid,
        sponsor: sponsor ? transform(Sponsor.fromDocument(sponsor)) : null
    })
)
