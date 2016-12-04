import {createStructuredSelector} from 'reselect'
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
    markers,
    command,
    style,
})
