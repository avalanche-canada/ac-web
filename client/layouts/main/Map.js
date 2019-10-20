import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMapState } from 'contexts/map/state'
import { Map, useNavigationControl } from 'hooks/mapbox'
import {
    useForecastRegions,
    useWeatherStations,
    useMountainConditionReports,
    useFatalAccidents,
    useAdvisories,
    useMountainInformationNetwork,
    useForecastMarkers,
} from './layers'

MapLayout.propTypes = {
    onMarkerClick: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default function MapLayout({ className, onMarkerClick, onLoad }) {
    const [map, setMap] = useState(null)
    const { zoom, setZoom, center, setCenter, pushError } = useMapState()
    function handleLoad({ target: map }) {
        map.on('zoomend', () => setZoom(map.getZoom()))
        map.on('moveend', () => setCenter(map.getCenter()))
    }
    const options = { zoom, center }
    const events = [
        ['error', pushError],
        ['load', handleLoad],
        ['load', onLoad],
    ]

    useNavigationControl(map)

    useForecastRegions(map)
    useWeatherStations(map)
    useMountainConditionReports(map)
    useFatalAccidents(map)
    useAdvisories(map)
    useMountainInformationNetwork(map)
    useForecastMarkers(map, onMarkerClick)

    return (
        <Map
            ref={setMap}
            className={className}
            options={options}
            events={events}
        />
    )
}
