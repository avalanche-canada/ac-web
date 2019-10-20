import React, { useEffect, useState, useMemo, useRef, forwardRef } from 'react'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import { accessToken, styles } from 'services/mapbox/config.json'
import { useLazyRef } from 'hooks'
import { clean } from 'utils/object'

mapbox.accessToken = accessToken

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

export const Map = forwardRef(({ options, ...props }, ref) => {
    const div = useRef(null)
    const map = useMap(div, options)

    ref(map)

    return <div ref={div} {...props} />
})

export function useSource(map, id, source, data) {
    const added = useRef(false)

    useEffect(() => {
        if (added.current) {
            map.getSource(id).setData(data)
        }
    }, [added.current, data])

    useEffect(() => {
        if (!map || map.getSource(id)) {
            return
        }

        map.addSource(id, clean({ ...source, data }))
        added.current = true
    }, [map])

    return added.current
}

export function useLayer(map, layer, beforeId, visible = true, filter, events) {
    const visibility = visible ? 'visible' : 'none'
    const added = useRef(false)

    useEffect(() => {
        if (!map) {
            return
        }

        layer = clean({
            ...layer,
            filter,
            layout: Object.assign({ visibility }, layer.layout),
        })

        map.addLayer(layer, beforeId)

        if (Array.isArray(events)) {
            for (const [type, listener] of events) {
                map.on(type, layer.id, listener)
            }
        }

        added.current = true
    }, [map])

    useEffect(() => {
        if (added.current) {
            map.setLayoutProperty(layer.id, 'visibility', visibility)
        }
    }, [visible, added.current])

    useEffect(() => {
        if (added.current) {
            map.setFilter(layer.id, filter)
        }
    }, [filter, added.current])

    return added.current
}

export function useMarkers(map, definitions) {
    const markers = useMemo(() => {
        if (!Array.isArray(definitions)) {
            return
        }

        return definitions.map(([lnglat, options]) => {
            const marker = new mapbox.Marker(options)

            marker.setLngLat(lnglat)

            return marker
        })
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

// Utils
function useControl(map, ControlClass, props, position = 'bottom-right') {
    const control = useLazyRef(() => new ControlClass(props))

    useEffect(() => {
        if (!map) {
            return
        }

        map.addControl(control.current, position)
    }, [map])

    return control.current
}
