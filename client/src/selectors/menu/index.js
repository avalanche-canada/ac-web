import {createSelector} from 'reselect'
import {getMenu} from 'reducers/drawers'
import LAYERS from 'constants/map/layers/instance'

export default createSelector(
    getMenu,
    function computeMapProps({layers, filters}) {
        function layerMapper(layer, type) {
            return layer.set('active', layers.has(type))
                        .set('filters', filters.get(type))
        }

        return {
            layers: LAYERS.map(layerMapper),
        }
    }
)
