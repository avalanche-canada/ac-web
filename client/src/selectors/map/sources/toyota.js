import {createSelector} from 'reselect'
import {point} from 'turf-helpers'
import {createSource} from './utils'
import {TOYOTA_TRUCK_REPORTS} from 'constants/map/layers'
import {getDocumentsOfType} from 'reducers/prismic'
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
        id: TOYOTA_TRUCK_REPORTS,
        features,
    })
)
