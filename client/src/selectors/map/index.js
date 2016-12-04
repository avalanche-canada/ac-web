import {createStructuredSelector} from 'reselect'
import sources from './sources'
import layers from './layers'
import markers from './markers'
import {computeFitBounds} from './bounds'
import feature from './feature'
import {
    getCommand as command,
    getStyle as style,
} from 'getters/map'

export default createStructuredSelector({
    computeFitBounds,
    feature,
    sources,
    layers,
    markers,
    command,
    style,
})
