import {createSelector} from 'reselect'
import {List} from 'immutable'
import {setVisibility} from './utils'
import getForecastMarkers from './forecast'
// import getMountainInformationNetworkMarkers from './mountainInformationNetwork'
import {getLayers as getVisibleLayers} from 'reducers/drawers'

const getMarkers = createSelector(
    getForecastMarkers,
    // getMountainInformationNetworkMarkers,
    (...args) => new List(args.reduce((all, markers) => all.concat(markers), []))
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
