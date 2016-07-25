import React, {Component, PropTypes} from 'react'

const {keys} = Object

export default class Layer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['fill', 'line', 'symbol', 'circle', 'raster', 'background']),
        metadata: PropTypes.object,
        'layer-ref': PropTypes.string,
        source: PropTypes.string,
        before: PropTypes.string,
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
    add = () => {
        const {map, id} = this
        const {events, before, ...layer} = this.props

        if (layer['layer-ref']) {
            layer.ref = layer['layer-ref']
            delete layer['layer-ref']
        }

        map.addLayer(layer, before)

        keys(events).forEach(function setListener(key) {
            map.on(key, function listener(event) {
                const features = map.queryRenderedFeatures(event.point, {
                    layers: [id]
                })

                events[key].call(null, event, features)
            })
        })
    }
    remove() {
        this.map.removeLayer(this.id)
    }
    componentDidMount() {
        if (this.map.loaded()) {
            this.add()
        } else {
            this.map.on('load', this.add)
        }
    }
    componentWillUnmount() {
        this.remove()
    }
    componentWillReceiveProps(nextProps) {
        const {map, props, id} = this

        keys(nextProps).forEach(function setLayerProperty(key) {
            const prop = nextProps[key]

            if (prop === props[key]) {
                return
            }

            switch (key) {
                case 'paint':
                    keys(prop).forEach(name => {
                        map.setPaintProperty(id, name, prop[name])
                    })
                    break
                case 'layout':
                    keys(prop).forEach(name => {
                        map.setLayoutProperty(id, name, prop[name])
                    })
                    break
                case 'filter':
                    map.setFilter(id, prop)
                    break
            }

        })
    }
    shouldComponentUpdate({filter, layout, paint}) {
        return  filter !== this.props.filter ||
                layout !== this.props.layout ||
                paint !== this.props.paint
    }
    render() {
        return null
    }
}
