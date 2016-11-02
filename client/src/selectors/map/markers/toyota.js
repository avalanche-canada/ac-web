import {createSelector} from 'reselect'
import {point} from 'turf-helpers'
import mapbox from 'services/mapbox/map'
import {TOYOTA_TRUCK_REPORTS} from 'constants/map/layers'
import {getEntitiesForSchema} from 'reducers/api/getters'
import {getDocumentsOfType} from 'reducers/prismic'
import {createElement} from './utils'
import Parser from 'prismic/parser'

const {LngLat} = mapbox

function createMarker(document) {
    const {position: {longitude, latitude}, headline} = Parser.parse(document)
    const name = '1'

    return {
        id: name,
        layer: TOYOTA_TRUCK_REPORTS,
        location: {
            query: {
                panel: `toyota-truck-reports:${name}`,
            },
        },
        element: createElement({
            src: '//res.cloudinary.com/avalanche-ca/image/upload/v1477430131/logos/logo_4c_2012_vert_toyota_4col_small.jpg',
            title: headline,
        }),
        lngLat: new LngLat(longitude, latitude),
        options: {
            offset: [-25, -25]
        },
    }
}

export default createSelector(
    state => getDocumentsOfType(state, 'toyota-truck-report'),
    reports => reports.map(createMarker),
)
