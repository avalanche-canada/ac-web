import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './InteractiveImage.css'
import Leaflet from 'leaflet'

@CSSModules(styles)
export default class InteractiveImage extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        minZoom: PropTypes.number,
        maxZoom: PropTypes.number,
        zoom: PropTypes.number,
    }
    static defaultProps = {
        minZoom: 1,
        maxZoom: 3,
        zoom: 1,
    }
    componentDidMount() {
        const {minZoom, maxZoom, zoom, width, height, src} = this.props

        const center = [0, 0]
        const crs = Leaflet.CRS.Simple

        const options = {
            minZoom,
            maxZoom,
            zoom,
            center,
            crs,
            attributionControl: false,
        }
        const map = Leaflet.map(this.element, options)

        const sw = map.unproject([0, height], 1)
        const ne = map.unproject([width, 0], 1)
        const bounds = new Leaflet.LatLngBounds(sw, ne)

        Leaflet.imageOverlay(src, bounds).addTo(map)

        map.setMaxBounds(bounds)

        this.map = map
    }
    componentWillUnmount() {
        this.map.remove()
    }
    render() {
        const {height, width} = this.props
        const props = {
            ref: ref => this.element = ref,
            styleName: 'Container',
            style: {
                height,
                width,
            },
        }

        return (
            <div {...props}></div>
        )
    }
}
