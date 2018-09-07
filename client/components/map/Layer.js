import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import isEqual from 'lodash/isEqual'

export default class Layer extends PureComponent {
    static Symbol(props) {
        return <Layer type="symbol" {...props} />
    }
    static Fill(props) {
        return <Layer type="fill" {...props} />
    }
    static Line(props) {
        return <Layer type="line" {...props} />
    }
    static Circle(props) {
        return <Layer type="circle" {...props} />
    }
    static Composite(props) {
        return <Layer type="composite" {...props} />
    }
    static propTypes = {
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
        source: PropTypes.string.isRequired,
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
    static defaultProps = {
        paint: {},
        layout: {},
    }
    setVisibility() {
        this.map.setLayoutProperty(
            this.props.id,
            'visibility',
            this.props.visible ? 'visible' : 'none'
        )
    }
    componentDidMount() {
        const {
            before,
            visible,
            sourceLayer,
            onMouseEnter,
            onMouseLeave,
            ...layer
        } = this.props
        const { id } = layer

        if (sourceLayer) {
            layer['source-layer'] = sourceLayer
        }

        Object.assign(layer.layout, {
            visibility: visible ? 'visible' : 'none',
        })

        this.map.addLayer(layer, before)

        this.map.on('mouseenter', id, onMouseEnter)
        this.map.on('mouseleave', id, onMouseLeave)
    }
    componentDidUpdate({ visible, filter }) {
        if (visible !== this.props.visible) {
            this.setVisibility()
        }
        if (!isEqual(filter, this.props.filter)) {
            const { id, filter } = this.props

            this.map.setFilter(id, filter)
        }
    }
    setMap = map => {
        this.map = map

        return null
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
