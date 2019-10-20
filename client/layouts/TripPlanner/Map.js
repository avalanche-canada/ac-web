import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import bbox from '@turf/bbox'
import { useMapState } from 'contexts/map/state'
import styles from './TripPlanner.css'
import { useNavigationControl, useMap } from 'hooks/mapbox'
import { styles as maps } from 'services/mapbox/config.json'

TripPlannerMap.propTypes = {
    area: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
    onFeaturesSelect: PropTypes.func.isRequired,
}

export default function TripPlannerMap({ onFeaturesSelect, onLoad }) {
    const ref = useRef(null)
    const counter = useRef(0)
    const { zoom, setZoom, center, setCenter } = useMapState()
    const map = useMap(ref, { zoom, center, style: maps.ates })
    function setActiveArea(id) {
        map.setFilter('active-ates-areas', [
            '==',
            'ATES_ZONE_ID',
            typeof id === 'number' ? id : -1,
        ])
    }

    useNavigationControl(map)

    useEffect(() => {
        if (!map) {
            return
        }

        function queryAreas(point) {
            return map.queryRenderedFeatures(point, {
                layers: ATES_AREAS_LAYERS,
            })
        }
        function queryZones(point) {
            return map.queryRenderedFeatures(point, {
                layers: ATES_ZONES_LAYERS,
            })
        }
        function queryRegions(point) {
            return map.queryRenderedFeatures(point, {
                layers: FORECAST_LAYERS,
            })
        }

        map.on('click', ({ point }) => {
            const [zone] = queryZones(point)
            const [area] = queryAreas(point)
            const [region] = queryRegions(point)

            setActiveArea(area ? area.properties.ATES_ZONE_ID : -1)

            if (zone) {
                map.fitBounds(bbox(zone.geometry), {
                    padding: 25,
                })
            } else {
                onFeaturesSelect({ region, area })
            }
        })
        map.on('zoomend', () => setZoom(map.getZoom()))
        map.on('moveend', () => setCenter(map.getCenter()))

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
            ...ATES_AREAS_LAYERS,
            ...ATES_ZONES_LAYERS,
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
const ATES_AREAS_LAYERS = ['ates-terrain']
const ATES_ZONES_LAYERS = ['ates-zones']
