import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import bbox from '@turf/bbox'
import { useMapState } from 'contexts/map/state'
import styles from './TripPlanner.css'
import { useNavigationControl, useMap } from 'hooks/mapbox'
import { STYLES } from 'services/mapbox/config'

TripPlannerMap.propTypes = {
    area: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
    onFeaturesSelect: PropTypes.func.isRequired,
}

export default function TripPlannerMap({ onFeaturesSelect, onLoad }) {
    const ref = useRef(null)
    const counter = useRef(0)
    const { zoom, center } = useMapState()
    const map = useMap(ref, {
        zoom: zoom.value,
        center: center.value,
        style: STYLES.ates,
    })
    function setActiveZone(id) {
        map.setFilter('active-ates-zones', [
            '==',
            'id',
            typeof id === 'number' ? id : -1,
        ])
    }

    useNavigationControl(map)

    useEffect(() => {
        if (!map) {
            return
        }

        function queryZones(point) {
            return map.queryRenderedFeatures(point, {
                layers: ATES_ZONES_LAYERS,
            })
        }
        function queryAreas(point) {
            return map.queryRenderedFeatures(point, {
                layers: ATES_AREAS_LAYERS,
            })
        }
        function queryRegions(point) {
            return map.queryRenderedFeatures(point, {
                layers: FORECAST_LAYERS,
            })
        }

        map.on('click', ({ point }) => {
            const [area] = queryAreas(point)
            const [zone] = queryZones(point)
            const [region] = queryRegions(point)

            setActiveZone(zone ? zone.properties.id : -1)

            if (area) {
                map.fitBounds(bbox(area.geometry), {
                    padding: 25,
                })
            } else {
                onFeaturesSelect({ region, zone })
            }
        })
        map.on('zoomend', () => zoom.set(map.getZoom()))
        map.on('moveend', () => center.set(map.getCenter()))

        function handleMouseEnter({ target }) {
            const canvas = target.getCanvas()

            canvas.style.cursor = 'pointer'
            counter.current++
        }
        function handleMouseLeave({ target }) {
            const canvas = target.getCanvas()

            counter.current--
            if (counter.current < 1) {
                canvas.style.cursor = ''
            }

            canvas.title = ''
        }

        for (const layer of [
            ...ATES_ZONES_LAYERS,
            ...ATES_AREAS_LAYERS,
            ...FORECAST_LAYERS,
        ]) {
            map.on('mouseenter', layer, handleMouseEnter)
            map.on('mouseleave', layer, handleMouseLeave)
        }

        onLoad(map)
    }, [map])

    return <div className={styles.Map} ref={ref} />
}

// Constants
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_ZONES_LAYERS = ['ates-zones']
const ATES_AREAS_LAYERS = ['ates-areas']
