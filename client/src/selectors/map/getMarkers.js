import {createSelector} from 'reselect'
import mapboxgl from 'mapboxgl'
import {ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/entities'

const {assign} = Object
const {LngLat} = mapboxgl

const getForecastRegions = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    features => features.toArray()
)

export default createSelector(
    getForecastRegions,
    function createMarkers(forecastRegions) {
        return forecastRegions.map(region => {
            const element = document.createElement('img')
            const dangerIconUrl = region.getIn(['properties', 'dangerIconUrl'])
            const name = region.getIn(['properties', 'name'])
            const centroid = region.getIn(['properties', 'centroid']).toArray()

            assign(element, {
                src: `http://www.avalanche.ca/${dangerIconUrl}`,
                alt: name,
                title: name,
                width: 50,
                height: 50,
                style: 'top: -25px; left: -25px; cursor: pointer;',
            })

            return {
                element,
                lnglat: LngLat.convert(centroid)
            }
        })
    }
)
