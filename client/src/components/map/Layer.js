import React, { Component, PropTypes } from 'react'

export default class Layer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['fill', 'line', 'symbol', 'circle', 'raster', 'background']),
        metadata: PropTypes.object,
        ref: PropTypes.string,
        source: PropTypes.string,
        'source-layer': PropTypes.string,
        minzoom: PropTypes.number,
        maxzoom: PropTypes.number,
        interactive: PropTypes.bool,
        filter: PropTypes.array,
        layout: PropTypes.object,
        paint: PropTypes.object,
        events: PropTypes.object,
    }
    static defaultProps = {
        events: {},
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    get map() {
        return this.context.map
    }
    get id() {
        return this.props.id
    }
    componentWillMount() {
        const {map, id} = this
        const {events, ...layer} = this.props

        map.on('load', function addLayer() {
            map.addLayer(layer)
        })

        Object.keys(events).forEach(function setListener(key) {
            map.on(key, function listener(event) {
                const features = map.queryRenderedFeatures(event.point, {
                    layers: [id]
                })

                events[key].call(null, event, features)
            })
        })
    }
    componentWillUnmount() {
        this.map.removeLayer(this.id)
    }
    LATERcomponentWillReceiveProps(nextProps) {
        const {map, props, id} = this

        if (!map.loaded()) {
            return
        }

        const keys = Object.keys(nextProps).filter(key => key !== 'id')
        const zoomRange = [props.minzoom, props.maxzoom]

        keys.forEach(function setLayerProperty(key) {
            const prop = nextProps[key]

            switch (key) {
                case 'paint':
                    map.setPaintProperty(id, key, prop.paint)
                    break
                case 'layout':
                    map.setLayoutProperty(id, key, prop.layout)
                    break
                case 'filter':
                    map.setFilter(id, prop.filter)
                    break
                case 'minzoom':
                    zoomRange[0] = prop
                    break
                case 'maxzoom':
                    zoomRange[1] = prop
                    break
            }

        })

        map.setLayerZoomRange(id, ...zoomRange)
    }
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    render() {
        return null
    }
}
