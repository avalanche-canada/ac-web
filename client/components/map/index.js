import React from 'react'
import mapbox from 'services/mapbox/map'
import Control from './Control'

export Map from './Map'
export StaticMap, { ManagedStaticMap } from './StaticMap'
export Marker from './Marker'
export Popup from './Popup'
export Control from './Control'

export function NavigationControl() {
    return <Control factory={navigation} />
}
export function FullscreenControl() {
    return <Control factory={fullscreen} />
}

function navigation() {
    return new mapbox.NavigationControl()
}
function fullscreen() {
    return new mapbox.FullscreenControl()
}
