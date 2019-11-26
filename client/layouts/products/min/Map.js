import React, { createElement, useState, useMemo } from 'react'
import StaticMap from 'components/map/StaticMap'
import minWithIncident from 'components/icons/min/min-pin-with-incident.png'
import { INCIDENT } from 'constants/min'
import { useReport } from './Context'
import { supported } from 'utils/mapbox'
import min from 'components/icons/min/min-pin.png'
import {
    Map,
    useFullscreenControl,
    useNavigationControl,
    useMarker,
} from 'hooks/mapbox'

export default function ContextMap() {
    const report = useReport()

    if (!report) {
        return null
    }

    const { title, lnglat, obs } = report
    const src = obs.some(hasIncident) ? minWithIncident : min

    return createElement(supported() ? DynamicMap : FallbackMap, {
        center: lnglat,
        src,
        title,
        zoom: 8,
        height: 200,
    })
}

function FallbackMap({ center, zoom, src, title, height }) {
    const [longitude, latitude] = center
    const url = 'https://www.avalanche.ca/' + src
    const overlay = `url-${encodeURIComponent(url)}(${longitude},${latitude})`

    return (
        <StaticMap
            zoom={zoom}
            longitude={longitude}
            latitude={latitude}
            height={height}
            overlay={overlay}
            title={title}
        />
    )
}

function DynamicMap({ center, zoom, src, title, height }) {
    const style = { height }
    const [map, setMap] = useState(null)
    const options = useMemo(
        () => ({
            element: Object.assign(document.createElement('img'), {
                src,
                title,
                width: 20,
            }),
        }),
        [src, title]
    )

    useMarker(map, center, options)
    useNavigationControl(map)
    useFullscreenControl(map)

    return <Map ref={setMap} style={style} options={{ center, zoom }} />
}

// Constants & utils
function hasIncident(observation) {
    return observation.obtype === INCIDENT
}
