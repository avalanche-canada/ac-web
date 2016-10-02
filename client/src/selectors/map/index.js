import {createStructuredSelector} from 'reselect'
import sources from './sources'
import layers from './layers'
import markers from './markers'
import bounds, {computeFitBoundsFactory} from './bounds'
import {
    getZoom as zoom,
    getCenter as center
} from 'reducers/map/getters'

export default createStructuredSelector({
    computeFitBounds: computeFitBoundsFactory,
    bounds,
    sources,
    layers,
    markers,
    zoom,
    center,
})
