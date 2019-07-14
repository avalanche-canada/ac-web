import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

export function Symbol(props) {
    return <Layer type="symbol" {...props} />
}
export function Fill(props) {
    return <Layer type="fill" {...props} />
}
export function Line(props) {
    return <Layer type="line" {...props} />
}
export function Circle(props) {
    return <Layer type="circle" {...props} />
}

Layer.propTypes = {
    map: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'fill',
        'line',
        'symbol',
        'circle',
        'heatmap',
        'fill-extrusion',
        'raster',
        'hillshade',
        'composite',
    ]).isRequired,
    source: PropTypes.string,
    sourceLayer: PropTypes.string,
    minzoom: PropTypes.number,
    maxzoom: PropTypes.number,
    filter: PropTypes.array,
    layout: PropTypes.object,
    paint: PropTypes.object,
    before: PropTypes.string,
    visible: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

Layer.defaultProps = {
    paint: {},
    layout: {},
}

export default function Layer(props) {
    useEffect(() => {
        const {
            map,
            before,
            visible,
            sourceLayer,
            onMouseEnter,
            onMouseLeave,
            ...rest
        } = props

        if (sourceLayer) {
            rest['source-layer'] = sourceLayer
        }

        rest.layout.visibility = visible === false ? 'none' : 'visible'

        map.addLayer(rest, before)
        map.on('mouseenter', rest.id, onMouseEnter)
        map.on('mouseleave', rest.id, onMouseLeave)
    }, [])

    useEffect(() => {
        props.map.setLayoutProperty(
            props.id,
            'visibility',
            props.visible === false ? 'none' : 'visible'
        )
    }, [props.visible])

    useEffect(() => {
        props.map.setFilter(props.id, props.filter)
    }, [props.filter])

    return null
}
