import React, { PureComponent, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../Context'
import Layer from '../Layer'

export default class GeoJSONSource extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        data: PropTypes.object,
        maxzoom: PropTypes.number,
        attribution: PropTypes.string,
        buffer: PropTypes.number,
        tolerance: PropTypes.number,
        cluster: PropTypes.bool,
        clusterRadius: PropTypes.number,
        clusterMaxZoom: PropTypes.number,
        lineMetrics: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.instanceOf(Layer),
            PropTypes.arrayOf(PropTypes.instanceOf(Layer)),
        ]),
    }
    static defaultProps = {
        data: {},
    }
    componentDidMount() {
        const { map } = this
        const { id, children, ...source } = this.props

        Object.assign(source, {
            type: 'geojson',
        })

        map.addSource(id, source)

        Children.map(children, layer => {
            const {
                before,
                visible,
                sourceLayer,
                onMouseEnter,
                onMouseLeave,
                ...rest
            } = Object.assign({ source: id }, Layer.defaultProps, layer.props)

            if (sourceLayer) {
                rest['source-layer'] = sourceLayer
            }

            Object.assign(rest.layout, {
                visibility: visible === false ? 'none' : 'visible',
            })

            map.addLayer(rest, before)
            map.on('mouseenter', rest.id, onMouseEnter)
            map.on('mouseleave', rest.id, onMouseLeave)
        })
    }
    componentDidUpdate({ data }) {
        if (data !== this.props.data) {
            this.map.getSource(this.props.id).setData(this.props.data)
        }
    }
    setMap = map => {
        this.map = map

        const { id } = this.props

        return Children.map(this.props.children, layer =>
            cloneElement(layer, { source: id })
        )
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
