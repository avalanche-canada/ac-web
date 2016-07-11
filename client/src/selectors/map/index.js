import {createSelector} from 'reselect'
import {getZoom, getCenter, getAction} from 'reducers/map'
import getSources from './getSources'
import getLayers from './getLayers'

export const getMapProps = createSelector(
    getZoom,
    getCenter,
    getSources,
    getLayers,
    getAction,
    function computeMapProps(zoom, center, sources, layers, action) {
        return {
            state: {
                zoom,
                center,
            },
            action,
            sources,
            layers,
        }
    }
)
