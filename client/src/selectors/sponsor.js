import {createSelector} from 'reselect'
import {getDocumentForUid} from 'getters/prismic'
import transformer from 'prismic/transformers'
import {getSponsors, getActiveSponsor} from 'getters/sponsors'

// TODO: Clean up!
// TODO: Combine transformer & transform

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

    // Let go through (i.e. return page) if not found
    // Allows to get any sponsor by uid
    // Used for Kananaskis in Forecast page
    return sponsors[page] || page
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
        sponsor: sponsor ? transform(transformer(sponsor)) : null
    })
)
