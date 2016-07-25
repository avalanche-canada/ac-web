import {createSelector} from 'reselect'
import {getLayers} from 'reducers/drawers'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import LAYERS, {updateVisibility} from './Layers'

function getActiveProps(state, {params, router}) {
    if (router.isActive(`/map/forecasts/${params.name}`)) {
        return {
            schema: ForecastRegion,
            id: params.name,
        }
    }
}

const computeVisibleLayers = createSelector(
    getLayers,
    layers => updateVisibility(LAYERS, layers)
)

const flattenLayers = createSelector(
    computeVisibleLayers,
    layers => layers.flatten(1).toList()
)

export default createSelector(
    getActiveProps,
    flattenLayers,
    function computeLayers(active = null, layers) {
        return layers
        
        if (active === null) {
            return layers
        }


        return layers.withMutations(layers => {
            [ForecastRegion].forEach(schema => {
                ['active', 'contour-active'].forEach(suffix => {
                    const id = `${schema.getKey()}-${suffix}`
                    const index = layers.findIndex(layer => layer.id === id)
                    const value = schema === active.schema ? active.id : ''

                    layer.filter = ['==', 'id', value],

                    layers.set(index, layer)
                })
            })
        })
    }
)
