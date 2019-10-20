import React, { useState, useEffect, forwardRef } from 'react'
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

const MapLayout = forwardRef(({ onMarkerClick }, ref) => {
    const [map, setMap] = useState(null)
    const { zoom, setZoom, center, setCenter, pushError } = useMapState()
    const options = { zoom, center }

    useEffect(() => {
        if (!map) {
            return
        }

        map.on('zoomend', () => setZoom(map.getZoom()))
        map.on('moveend', () => setCenter(map.getCenter()))
        map.on('error', pushError)

        ref(map)
    }, [map])

    useNavigationControl(map)

    useForecastRegions(map)
    useWeatherStations(map)
    useMountainConditionReports(map)
    useFatalAccidents(map)
    useAdvisories(map)
    useMountainInformationNetwork(map)
    useForecastMarkers(map, onMarkerClick)

    return <Map ref={setMap} options={options} />
})

MapLayout.propTypes = {
    onMarkerClick: PropTypes.func.isRequired,
}

export default MapLayout
