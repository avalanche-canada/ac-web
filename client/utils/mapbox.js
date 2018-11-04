import isMapboxSupported from '@mapbox/mapbox-gl-supported'
import memoize from 'lodash/memoize'

export const supported = memoize(isMapboxSupported)
