import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { createStyleUrl } from 'services/mapbox/api'
import { useEventListener } from 'hooks'

StaticMap.propTypes = {
    title: PropTypes.string,
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

export default function StaticMap({ tracked, title, ...props }) {
    const ref = useRef(null)
    const [url, setUrl] = useState(null)
    function resizeHandler() {
        setUrl(
            createStyleUrl({
                ...props,
                width: ref.current.clientWidth,
            })
        )
    }

    useEffect(resizeHandler, [tracked])
    useEventListener(
        'resize',
        tracked ? debounce(resizeHandler, 500) : () => {}
    )

    return (
        <div ref={ref} title={title}>
            {url && <img src={url} />}
        </div>
    )
}
