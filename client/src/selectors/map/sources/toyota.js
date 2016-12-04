import {createSelector} from 'reselect'
import {point} from 'turf-helpers'
import {createSource} from './utils'
import {getDocumentsOfType} from 'reducers/prismic'
import {createElement} from './utils'
import Parser from 'prismic/parser'

function transform({uid, position: {longitude, latitude}, headline}) {
    return point([longitude, latitude], {
        title: headline,
        uid,
    })
}

const getFeatures = createSelector(
    state => getDocumentsOfType(state, 'toyota-truck-report'),
    documents => documents.map(document => transform(Parser.parse(document))).toArray(),
)

export default createSelector(
    getFeatures,
    features => createSource({
        features,
    })
)
