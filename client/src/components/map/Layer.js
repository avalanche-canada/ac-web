import React, {Component, PropTypes} from 'react'

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
    remove() {
        this.map.removeLayer(this.id)
    }
    componentDidMount() {
        const {map, id} = this
        const {before, ...layer} = this.props

        // Because, ref is already used by React
        // https://facebook.github.io/react/docs/more-about-refs.html
        if (layer['layer-ref']) {
            layer.ref = layer['layer-ref']
            delete layer['layer-ref']
        }

        map.addLayer(layer, before)
    }
    componentWillUnmount() {
        this.remove()
    }
    componentWillReceiveProps(nextProps) {
        const {map, props, id} = this

        Object.keys(nextProps).forEach(function setLayerProperty(key) {
            const prop = nextProps[key]

            if (prop === props[key]) {
                return
            }

            switch (key) {
                case 'paint':
                    Object.keys(prop).forEach(name => {
                        map.setPaintProperty(id, name, prop[name])
                    })
                    break
                case 'layout':
                    Object.keys(prop).forEach(name => {
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
