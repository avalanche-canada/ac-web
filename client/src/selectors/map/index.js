import {createStructuredSelector} from 'reselect'
import sources from './sources'
import layers from './layers'
import markers from './markers'
import bounds from './bounds'
import {
    getZoom as zoom,
    getCenter as center
} from 'reducers/map/getters'

export default createStructuredSelector({
    bounds,
    sources,
    layers,
    markers,
    zoom,
    center,
})
