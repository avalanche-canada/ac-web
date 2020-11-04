import React, { useEffect, useState, useMemo, useRef, forwardRef } from 'react'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import { ACCESS_TOKEN, STYLES } from 'services/mapbox/config'
import { useLazyRef } from 'hooks'
import { clean } from 'utils/object'
import { captureException } from 'services/sentry'

mapbox.accessToken = ACCESS_TOKEN

export function useMap(ref, options) {
    const [map, setMap] = useState()

    useEffect(() => {
        // TODO Should we test the existance of ref.current? Or it will be always available?
        // https://sentry.io/organizations/avalanche-canada/issues/1311359631

        const instance = new mapbox.Map({
            style: STYLES.default,
            dragRotate: false,
            ...options,
            container: ref.current,
        })

        instance.on('load', () => {
            setMap(instance)
        })
        instance.on('error', event => {
            captureException(event.error)
        })

        return () => {
            instance.remove()
        }
    }, [])

    return map
}

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

// Convinient to iniatilize events here, but I would prefer to not do it here.
// We are not removing them and we are not listening on the change of it.
// Perhaps more hooks could be created, but it not be as efficient
export function useLayer(map, layer, beforeId, visible = true, filter, events) {
    const visibility = visible ? 'visible' : 'none'
    const added = useRef(false)

    useEffect(() => {
        if (!map) {
            return
        }

        map.addLayer(
            clean({
                ...layer,
                filter,
                layout: Object.assign({ visibility }, layer.layout),
            }),
            beforeId
        )

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

        return definitions.map(([centroid, options]) => {
            const { longitude, latitude } = centroid
            const marker = new mapbox.Marker(options)

            marker.setLngLat([longitude, latitude])

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

export function useMarker(map, lnglat, options) {
    const definition = [lnglat, options]
    const definitions = useMemo(() => [definition], definition)

    return useMarkers(map, definitions)[0]
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

// One component to make creating map easier(ish)
export const Map = forwardRef(({ options, ...props }, ref) => {
    const div = useRef(null)
    const map = useMap(div, options)

    // To prevent an infinite loop
    useEffect(() => {
        if (map) {
            ref(map)
        }
    }, [map])

    return <div ref={div} {...props} />
})

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
