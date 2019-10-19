import { useEffect, useRef, useState } from 'react'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import * as turf from '@turf/helpers'
import { accessToken, styles } from 'services/mapbox/config.json'

export function useMap(ref, props) {
    const [map, setMap] = useState()

    useEffect(() => {
        if (map) {
            return
        }
        const instance = new mapbox.Map({
            style: styles.default,
            ...props,
            container: ref.current,
        })

        instance.on('load', () => {
            setMap(instance)
        })

        return () => {
            instance.remove()
        }
    }, [])

    return map
}

export function useSource(map, id, source) {
    useEffect(() => {
        if (!map || map.getSource(id)) {
            return
        }

        map.addSource(id, source)

        return () => {
            map.removeSource(id)
        }
    }, [map, source])
}

export function useGeoJSONSource(map, id, source) {
    const definition = Object.assign(
        {
            data: EMPTY_FEATURE_COLLECTION,
        },
        source,
        {
            type: 'geojson',
        }
    )

    return useSource(map, id, definition)
}

export function useSourceData(map, id, data) {
    useEffect(() => {
        if (!map || !map.getSource(id) || !data) {
            return
        }

        map.getSource(id).setData(data)
    }, [map, data])
}

export function useLayer(map, layer, beforeId) {
    useEffect(() => {
        const { id } = layer

        if (!map || map.getLayer(id)) {
            return
        }

        map.addLayer(layer, beforeId)

        return () => {
            map.removeLayer(id)
        }
    }, [map, layer, beforeId])
}

export function useMarkers(map, definitions) {
    const [markers, setMarkers] = useState(null)

    useEffect(() => {
        if (!Array.isArray(definitions)) {
            return
        }

        const markers = definitions.map(([lnglat, options]) => {
            const marker = new mapbox.Marker(options)

            marker.setLngLat(lnglat)

            return marker
        })

        setMarkers(markers)
    }, [definitions])

    useEffect(() => {
        if (!map || !Array.isArray(markers)) {
            return
        }

        for (const marker of markers) {
            marker.addTo(map)
        }

        return () => {
            for (const marker of markers) {
                marker.remove()
            }
            setMarkers(null)
        }
    }, [map, markers])

    return markers
}

export function useNavigationControl(map, props, position) {
    return useControl(
        map,
        mapbox.NavigationControl,
        Object.assign({ showCompass: false }, props),
        position
    )
}

export function useFullscreenControl(map, props, position) {
    return useControl(map, mapbox.FullscreenControl, props, position)
}

export function useGeolocateControl(map, props, position) {
    return useControl(map, mapbox.GeolocateControl, props, position)
}

mapbox.accessToken = accessToken

function useControl(map, ControlClass, props, position = 'bottom-right') {
    const control = useRef(new ControlClass(props))

    useEffect(() => {
        if (!map) {
            return
        }

        map.addControl(control.current, position)

        return () => {
            map.removeControl(control.current)
        }
    }, [map])

    return control.current
}

// Constants
const EMPTY_FEATURE_COLLECTION = turf.featureCollection([])
