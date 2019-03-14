import { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'

Marker.propTypes = {
    map: PropTypes.object.isRequired,
    lngLat: PropTypes.arrayOf(PropTypes.number).isRequired,
    element: PropTypes.object.isRequired,
    options: PropTypes.object,
}

export default function Marker(props) {
    const { element, lngLat, options, map } = props

    useEffect(() => {
        const marker = new mapbox.Marker(element, options)
            .setLngLat(lngLat)
            .addTo(map)

        return () => {
            marker.remove()
        }
    }, [element, lngLat])

    return null
}
