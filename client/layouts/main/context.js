import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react'
import { getCoord } from '@turf/invariant'
import { useMapState, ERRORS, useGuessBounds } from 'contexts/map/state'
import * as mapbox from 'hooks/mapbox'
import { useLocation } from 'router/hooks'
import { useMapOffset } from './drawers/hooks'
import * as layers from './layers'
import styles from './Map.module.css'

const MapContext = createContext()

export function Map({ children }) {
    const div = useRef()
    const { zoom, center, errors } = useMapState()
    const options = { zoom: zoom.value, center: center.value }
    const map = mapbox.useMap(div, options)
    const bounds = useGuessBounds()
    const handleMapClick = useMapClickHandler()

    // Initialize map with listeners
    useEffect(() => {
        if (!map) {
            return
        }

        map.on('zoomend', () => {
            zoom.set(map.getZoom())
        })
        map.on('moveend', () => {
            center.set(map.getCenter())
        })
        map.on('error', ({ error }) => {
            errors.add(ERRORS.MAP, error)
        })
    }, [map])

    // Initialize map click handler whenever "map" and the "listener" change
    useEffect(() => {
        if (!map) {
            return
        }

        map.on('click', handleMapClick)

        return () => {
            map.off('click', handleMapClick)
        }
    }, [map, handleMapClick])

    // Change map's camera based on the guessed bounds
    useEffect(() => {
        if (map && bounds) {
            map.fitBounds(bounds)
        }
    }, [map, bounds, zoom.value])

    mapbox.useNavigationControl(map)

    layers.useForecastRegions(map)
    layers.useWeatherStations(map)
    layers.useMountainConditionReports(map)
    layers.useFatalAccidents(map)
    layers.useMountainInformationNetwork(map)
    layers.useForecastMarkers(map)

    return (
        <MapContext.Provider value={map}>
            <div ref={div} className={styles.Map} />
            {children}
        </MapContext.Provider>
    )
}

export function useMap() {
    return useContext(MapContext)
}

// Handlers
function useMapClickHandler() {
    const { location, navigate } = useLocation()
    const offset = useMapOffset()

    return useCallback(
        event => {
            const { point, target: map } = event
            const [feature] = map.queryRenderedFeatures(point)

            if (!feature) {
                return
            }

            const { properties } = feature

            if (properties.cluster) {
                const source = map.getSource(feature.source)

                source.getClusterExpansionZoom(properties.cluster_id, (error, zoom) => {
                    if (error) {
                        // We do not really care if there is an error,
                        // we will just zoom in a bit so user receives a
                        // feedback to the click on the cluster!
                        zoom = map.getZoom() + 1
                    }

                    map.flyTo({
                        center: getCoord(feature),
                        zoom,
                        offset,
                    })
                })
            } else {
                if ('url' in properties) {
                    const { url, slug } = properties

                    window.open(url, slug)
                } else {
                    const { pathname = location.pathname } = properties
                    let { search } = location

                    if ('panel' in properties) {
                        search = `?panel=${properties.panel}`
                    }

                    navigate(pathname + search)
                }
            }
        },
        [offset, location.pathname, location.search]
    )
}
