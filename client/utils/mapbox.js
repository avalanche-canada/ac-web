import mapbox from 'mapbox-gl'
import memoize from 'utils/memoize'

export const supported = memoize(failIfMajorPerformanceCaveat =>
    mapbox.supported(failIfMajorPerformanceCaveat)
)
