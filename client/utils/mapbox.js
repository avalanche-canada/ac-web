import isMapboxSupported from '@mapbox/mapbox-gl-supported'
import memoize from 'utils/memoize'

export const supported = memoize(isMapboxSupported)
