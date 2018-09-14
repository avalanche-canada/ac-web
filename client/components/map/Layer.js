import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    static propTypes = {
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
    static defaultProps = {
        paint: {},
        layout: {},
    }
    componentDidMount() {
        const {
            map,
            before,
            visible,
            sourceLayer,
            onMouseEnter,
            onMouseLeave,
            ...rest
        } = this.props

        if (sourceLayer) {
            rest['source-layer'] = sourceLayer
        }

        Object.assign(rest.layout, {
            visibility: visible === false ? 'none' : 'visible',
        })

        map.addLayer(rest, before)
        map.on('mouseenter', rest.id, onMouseEnter)
        map.on('mouseleave', rest.id, onMouseLeave)
    }
    componentDidUpdate({ visible, filter }) {
        if (visible !== this.props.visible) {
            this.props.map.setLayoutProperty(
                this.props.id,
                'visibility',
                this.props.visible === false ? 'none' : 'visible'
            )
        }
        if (!isEqual(filter, this.props.filter)) {
            const { id, filter } = this.props

            this.props.map.setFilter(id, filter)
        }
    }
    render() {
        return null
    }
}
