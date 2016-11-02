import {createSelector} from 'reselect'
import {List} from 'immutable'
import {setVisibility} from './utils'
import getForecastMarkers from './forecast'
import getToyotaMarkers from './toyota'
import {getLayers as getVisibleLayers} from 'reducers/drawers'

const getMarkers = createSelector(
    getForecastMarkers,
    getToyotaMarkers,
    (...args) => args.reduce((all, markers) => all.concat(markers), new List())
)

export default createSelector(
    getMarkers,
    getVisibleLayers,
    (markers, layers) => markers.withMutations(markers => {
        markers.forEach((marker, index) => {
            markers.set(index, setVisibility(marker, layers.has(marker.layer)))
        })
    })
)
