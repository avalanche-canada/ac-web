import {createSelector, createStructuredSelector} from 'reselect'
import markers from './markers'
import {computeFitBounds} from './bounds'
import feature from './feature'
import {
    getCommand as command,
    getStyle,
} from 'getters/map'

const style = createSelector(
    getStyle,
    style => style.has('id') ? style : null,
)

export default createStructuredSelector({
    computeFitBounds,
    feature,
    markers,
    command,
    style,
})
