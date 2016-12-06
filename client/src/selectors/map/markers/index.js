import {createSelector} from 'reselect'
import {setVisibility} from './utils'
import getForecastMarkers from './forecast'
import {getVisibleLayers} from 'getters/drawers'

export default createSelector(
    getForecastMarkers,
    getVisibleLayers,
    (markers, layers) => markers.withMutations(markers => {
        markers.forEach((marker, index) => {
            markers.set(index, setVisibility(marker, layers.has(marker.layer)))
        })
    })
)
