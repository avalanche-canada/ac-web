import {createSelector} from 'reselect'
import {getMenu} from 'reducers/drawers'
import LAYERS from 'constants/map/layers/instance'

export default createSelector(
    getMenu,
    function computeMapProps({layers, filters}) {
        function layerMapper(layer) {
            return layer.merge({
                active: layers.has(name),
                filters: filters.get(name),
            })
        }

        return {
            layers: LAYERS.map(layerMapper),
        }
    }
)
