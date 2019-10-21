import React, { useState, useEffect, forwardRef } from 'react'
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
import { captureException } from 'services/sentry'

export default forwardRef((props, ref) => {
    const [map, setMap] = useState(null)
    const { zoom, setZoom, center, setCenter, addError } = useMapState()
    const options = { zoom, center }

    useEffect(() => {
        if (!map) {
            return
        }

        map.on('zoomend', () => setZoom(map.getZoom()))
        map.on('moveend', () => setCenter(map.getCenter()))
        map.on('error', error => {
            addError(error)
            captureException(error)
        })

        ref(map)
    }, [map])

    useNavigationControl(map)

    useForecastRegions(map)
    useWeatherStations(map)
    useMountainConditionReports(map)
    useFatalAccidents(map)
    useAdvisories(map)
    useMountainInformationNetwork(map)
    useForecastMarkers(map)

    return <Map ref={setMap} options={options} />
})
