import { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'

Marker.propTypes = {
    map: PropTypes.object.isRequired,
    lngLat: PropTypes.arrayOf(PropTypes.number).isRequired,
    element: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    options: PropTypes.object,
}

export default function Marker(props) {
    const { element, lngLat, options, onClick, map } = props

    useEffect(() => {
        if (typeof onClick === 'function') {
            Object.assign(element, {
                onclick(event) {
                    onClick(props, event)
                },
            })
        }

        const marker = new mapbox.Marker(element, options)
            .setLngLat(lngLat)
            .addTo(map)

        return () => {
            marker.remove()
        }
    }, [element, lngLat])

    return null
}
