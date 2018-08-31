import React, { PureComponent } from 'react'
import { Consumer } from './Context'

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
    }
    static defaultProps = {
        paint: {},
    }
    setVisibility() {
        this.map.setPaintProperty(
            this.props.id,
            'visibility',
            this.props.visible ? 'visible' : 'none'
        )
    }
    componentDidMount() {
        const { before, visible, ...layer } = this.props

        Object.assign(layer.paint, {
            visibility: visible ? 'visible' : 'none',
        })

        this.map.addLayer(layer, before)
    }
    componentDidUpdate({ visible }) {
        if (visible !== this.props.visible) {
            this.setVisibility()
        }
    }
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
