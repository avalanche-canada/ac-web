import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import bbox from '@turf/bbox'
import { useIntl } from 'react-intl'
import { useMapState } from 'contexts/map/state'
import styles from './TripPlanner.css'
import { useNavigationControl, useMap } from 'hooks/mapbox'
import { STYLES } from 'services/mapbox/config'
import { Popup } from 'mapbox-gl'

TripPlannerMap.propTypes = {
    area: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
    onFeaturesSelect: PropTypes.func.isRequired,
}

export default function TripPlannerMap({ onFeaturesSelect, onLoad }) {
    const intl = useIntl()
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
        function queryDecisionPoints(point) {
            return map.queryRenderedFeatures(point, {
                layers: DECISION_POINTS,
            })
        }

        map.on('click', ({ point }) => {
            // TODO Should combine into one query
            const [decisionPoint] = queryDecisionPoints(point)

            if (decisionPoint) {
                const { properties } = decisionPoint
                const { coordinates } = decisionPoint.geometry
                const url = `/api/ates/en/decision-points/${properties.id}.json`
                const popup = new Popup()
                const html = p(
                    intl.formatMessage({
                        description: 'Layout TripPlanner/Map',
                        defaultMessage: 'Loading information...',
                    })
                )

                popup
                    .setLngLat(coordinates)
                    .setHTML(html)
                    .addTo(map)

                fetch(url)
                    .then(response => response.json())
                    .then(
                        ({ warnings }) => {
                            let html = p(
                                intl.formatMessage({
                                    description: 'Layout TripPlanner/Map',
                                    defaultMessage:
                                        'No information has been found for that decision point.',
                                })
                            )

                            if (warnings.length > 0) {
                                warnings = warnings.reduce(
                                    (warnings, { type, warning }) => {
                                        if (!(type in warnings)) {
                                            warnings[type] = []
                                        }

                                        warnings[type].push(warning)

                                        return warnings
                                    },
                                    {}
                                )
                                html = Object.entries(warnings).reduce(
                                    (html, [type, warnings]) =>
                                        html +
                                        `
                                        <section>
                                            <h3>${type}</h3>
                                            <ul>
                                                ${warnings.reduce(
                                                    (html, warning) =>
                                                        html +
                                                        `<li>${warning}</li>`,
                                                    ''
                                                )}
                                            </ul>
                                        </section>
                                    `,
                                    ''
                                )
                            }

                            popup.setHTML(html)
                        },
                        () => {
                            const html = p(
                                intl.formatMessage({
                                    description: 'Layout TripPlanner/Map',
                                    defaultMessage:
                                        'An error happened while getting decision point information.',
                                })
                            )

                            popup.setHTML(html)
                        }
                    )

                return
            }

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

// Constants and utils
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_ZONES_LAYERS = ['ates-zones']
const ATES_AREAS_LAYERS = ['ates-areas']
const DECISION_POINTS = ['ates-decision-points']
function p(inner) {
    return `<p>${inner}</p>`
}
