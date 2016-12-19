import {createSelector, createStructuredSelector} from 'reselect'
import markers from './markers'
import bounds, {computeFitBounds} from './bounds'
import {
    getCommand as command,
    getStyle,
} from 'getters/map'

// TODO: Need a better to do that
const style = createSelector(
    getStyle,
    style => style.has('id') ? style : null,
)

export default createStructuredSelector({
    computeFitBounds,
    bounds,
    markers,
    command,
    style,
})
