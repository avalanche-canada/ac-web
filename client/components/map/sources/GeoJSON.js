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
    addSource = ({ target }) => {
        const { id, children, ...source } = this.props

        Object.assign(source, {
            type: 'geojson',
        })

        target.addSource(id, source)
    }
    setData = () => {
        const source = this.map.getSource(this.props.id)

        if (source) {
            source.setData(this.props.data)
        }
    }
    componentDidUpdate({ data }) {
        if (data !== this.props.data) {
            if (this.map.isStyleLoaded()) {
                this.setData()
            } else {
                this.map.once('load', this.setData)
            }
        }
    }
    withMap = map => {
        this.map = map

        map.once('load', this.addSource)

        const { id } = this.props

        return Children.map(this.props.children, layer =>
            cloneElement(layer, { source: id })
        )
    }
    render() {
        return <Consumer>{this.withMap}</Consumer>
    }
}
