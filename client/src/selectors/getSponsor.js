import {createSelector} from 'reselect'
import {getDocumentForBookmark, getDocumentsOfType} from 'reducers/prismic'
import {Sponsor} from 'prismic/types'

function getDefaultSponsors(state) {
    return getDocumentForBookmark(state, 'sponsors')
}
function getSponsors(state) {
    return getDocumentsOfType(state, 'sponsor')
}
const getDefaultSponsor = createSelector(

)

function getSponsor(state, {location, params, route}) {

}


export default createSelector(
    getDefaultSponsor,
    getSponsors,
    (definition, sponsors) => {
        const document = sponsors.get(definition.getLink(page).id)

        if (document) {
            return Sponsor.fromDocument(document)
        }
    }
)
