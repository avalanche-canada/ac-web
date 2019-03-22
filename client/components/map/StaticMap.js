import React, { useState, useRef, useEffect, Children } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { createStyleUrl } from 'services/mapbox/api'
import { PRIMARY } from 'constants/colors'
import Marker from './Marker'

StaticMap.propTypes = {
    tracked: PropTypes.bool,
    styleId: PropTypes.string,
    overlay: PropTypes.arrayOf(PropTypes.string),
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    zoom: PropTypes.number,
    bearing: PropTypes.number,
    pitch: PropTypes.number,
    auto: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    retina: PropTypes.bool,
}

StaticMap.Managed = function Managed({ children, center, ...props }) {
    return (
        <StaticMap
            {...props}
            longitude={center.lng}
            latitude={center.lat}
            overlay={createOverlay(children)}
        />
    )
}

export default function StaticMap({ tracked, ...props }) {
    const ref = useRef(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        function resizeHandler() {
            setUrl(
                createStyleUrl({
                    ...props,
                    width: ref.current.clientWidth,
                })
            )
        }
        const handleResize = debounce(resizeHandler, 500)

        if (tracked) {
            window.addEventListener('resize', handleResize)
        }

        resizeHandler()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [tracked])

    return <div ref={ref}>{url && <img src={url} />}</div>
}

// Utils
function createOverlay(children) {
    return Children.toArray(children)
        .filter(Boolean)
        .filter(({ type }) => type === Marker)
        .map(({ props }) => {
            const { lng, lat } = props.lngLat
            try {
                const url = new URL(props.element.src)

                url.protocol = 'https'
                url.host = 'www.avalanche.ca'

                return `url-${encodeURIComponent(url.href)}(${lng},${lat})`
            } catch (error) {
                return `pin-s+${PRIMARY.substr(1)}(${lng},${lat})`
            }
        })
}
