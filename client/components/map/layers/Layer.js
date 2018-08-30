import React, { PureComponent } from 'react'
import { Consumer } from '../Context'

export default class Layer extends PureComponent {
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
        ]).isRequired,
        source: PropTypes.string.isRequired,
        minzoom: PropTypes.number,
        maxzoom: PropTypes.number,
        filter: PropTypes.array,
        layout: PropTypes.object,
        paint: PropTypes.object,
        before: PropTypes.string,
        // visible: PropTypes.bool,
    }
    remove() {
        this.map.removeLayer(this.props.id)
    }
    componentDidMount() {
        const { before, ...layer } = this.props

        this.map.addLayer(layer, before)
    }
    componentDidUpdate() {}
    componentWillUnmount() {
        this.map.removeLayer(this.props.id)
    }
    setMap = map => {
        this.map = map

        return null
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
