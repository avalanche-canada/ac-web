import { createStructuredSelector } from 'reselect'
import markers from './markers'
import bounds, { computeFitBounds } from './bounds'
import style from './style'
import { getCommand as command } from 'getters/map'

export default createStructuredSelector({
    computeFitBounds,
    bounds,
    markers,
    command,
    style,
})
