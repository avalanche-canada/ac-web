import mapbox from '~/services/mapbox/map'
import control from './control'

export Map from './Map'
export StaticMap, { ManagedStaticMap } from './StaticMap'
export Marker from './Marker'
export Popup from './Popup'

export const NavigationControl = control(mapbox.NavigationControl)
export const FullscreenControl = control(mapbox.FullscreenControl)
