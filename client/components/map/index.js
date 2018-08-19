import React from 'react'
import mapbox from 'mapbox-gl/mapbox-gl'
import Control from './Control'

export Map from './Map'
export Basic from './Basic'
export StaticMap from './StaticMap'
export Marker from './Marker'
export Control from './Control'

export function NavigationControl({ position, ...props }) {
    return (
        <Control
            position={position}
            factory={() => new mapbox.NavigationControl(props)}
        />
    )
}
export function FullscreenControl({ position, ...props }) {
    return (
        <Control
            position={position}
            factory={() => new mapbox.FullscreenControl(props)}
        />
    )
}
export function GeolocateControl({ position, ...props }) {
    return (
        <Control
            position={position}
            factory={() => new mapbox.GeolocateControl(props)}
        />
    )
}
