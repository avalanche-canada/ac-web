import React, { useRef, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import {
    useMap,
    useNavigationControl,
    useFullscreenControl,
    useGeolocateControl,
} from 'hooks/mapbox'
import { supported } from 'utils/mapbox'
import place from 'components/icons/place.svg'
import styles from './GeoPosition.css'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import bboxPolygon from '@turf/bbox-polygon'

export default supported() ? GeoPosition : Null

GeoPosition.propTypes = {
    onChange: PropTypes.func,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
}

function GeoPosition({ longitude, latitude, onChange }) {
    const ref = useRef()
    const map = useMap(ref, { zoom: 2.9, center: [-125.15, 54.8] })
    const marker = useMemo(() => {
        const element = document.createElement('img')

        element.src = place

        // Use "useMarker", but it is a specific use case, more tests need to be done
        const marker = new mapbox.Marker({ element, draggable: true })

        marker.on('dragend', () => {
            const { lng, lat } = marker.getLngLat()

            onChange({
                longitude: round(lng),
                latitude: round(lat),
            })
        })

        return marker
    }, [])

    useNavigationControl(map)
    useFullscreenControl(map)
    useGeolocateControl(map, {
        fitBoundsOptions: {
            maxZoom: 10,
        },
    })

    useEffect(() => {
        if (!map) {
            return
        }

        map.on('click', ({ lngLat }) => {
            const { lng, lat } = lngLat.wrap()

            onChange({
                longitude: round(lng),
                latitude: round(lat),
            })
        })
    }, [map])

    useEffect(() => {
        if (!map) {
            return
        }

        if (!areValidCoordinates(longitude, latitude)) {
            return
        }

        const lngLat = new mapbox.LngLat(longitude, latitude)
        const bounds = map.getBounds()
        const polygon = bboxPolygon(bounds.toArray().flat())
        const point = turf.point(lngLat.toArray())

        marker.setLngLat(lngLat)
        marker.addTo(map)

        if (!inside(point, polygon)) {
            map.flyTo({
                center: lngLat,
                speed: 1,
            })
        }
    }, [map, longitude, latitude])

    return (
        <div className={styles.Container}>
            <div ref={ref} />
        </div>
    )
}

// Utils
function isValidNumber(number) {
    return typeof number === 'number' && !isNaN(number)
}

function areValidCoordinates(longitude, latitude) {
    return (
        isValidNumber(latitude) &&
        latitude <= 90 &&
        latitude >= -90 &&
        isValidNumber(longitude)
    )
}

function round(number) {
    return Math.round(number * 100000) / 100000
}

function Null() {
    return null
}
