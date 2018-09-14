import React from 'react'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import Control from './Control'
import Map from './Map'

export Map from './Map'
export StaticMap from './StaticMap'
export Marker from './Marker'
export Control from './Control'
export Layer from './Layer'
export Source from './sources/GeoJSON'

export function NavigationControl({ position, ...props }) {
    return (
        <Map.With>
            <Control
                position={position}
                factory={() => new mapbox.NavigationControl(props)}
            />
        </Map.With>
    )
}
export function FullscreenControl({ position, ...props }) {
    return (
        <Map.With>
            <Control
                position={position}
                factory={() => new mapbox.FullscreenControl(props)}
            />
        </Map.With>
    )
}
export function GeolocateControl({ position, ...props }) {
    return (
        <Map.With>
            <Control
                position={position}
                factory={() => new mapbox.GeolocateControl(props)}
            />
        </Map.With>
    )
}
