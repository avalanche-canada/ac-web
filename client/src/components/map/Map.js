import React, {PropTypes, Component} from 'react'
import CSSModule from 'react-css-modules'
import mapboxgl, {styles} from 'mapboxgl'
import {CanadianBounds, RevelstokeCenter} from 'constants/map'
import css from './Map.css'

const STYLES = Object.keys(styles)
const {LngLatBounds} = mapboxgl

@CSSModule(css)
export default class Map extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.oneOf(STYLES),
        center: PropTypes.arrayOf(PropTypes.number),
        zoom: PropTypes.number,
        bearing: PropTypes.number,
        pitch: PropTypes.number,
        minZoom: PropTypes.number,
        maxZoom: PropTypes.number,
        interactive: PropTypes.bool,
        bearingSnap: PropTypes.number,
        classes: PropTypes.arrayOf(PropTypes.string),
        attributionControl: PropTypes.bool,
        failIfMajorPerformanceCaveat: PropTypes.bool,
        preserveDrawingBuffer: PropTypes.bool,
        maxBounds: PropTypes.instanceOf(LngLatBounds),
        scrollZoom: PropTypes.bool,
        boxZoom: PropTypes.bool,
        dragRotate: PropTypes.bool,
        dragPan: PropTypes.bool,
        keyboard: PropTypes.bool,
        doubleClickZoom: PropTypes.bool,
        touchZoomRotate: PropTypes.bool,
        trackResize: PropTypes.bool,
        events: PropTypes.object,
        bounds: PropTypes.shape({
            bbox: PropTypes.instanceOf(LngLatBounds),
            options: PropTypes.object,
        }),
    }
    static defaultProps = {
        style: 'default',
        zoom: 10,
        center: RevelstokeCenter,
        maxBounds: CanadianBounds,
        attributionControl: false,
    }
    static childContextTypes = {
        map: PropTypes.object,
    }
    state = {}
    get map() {
        return this.state.map
    }
    set map(map) {
        this.setState({map})
    }
    getChildContext() {
        return {
            map: this.map
        }
    }
    componentDidMount() {
        const {container} = this.refs
        const {style, children, events, bounds, ...rest} = this.props
        const map = new mapboxgl.Map({
            ...rest,
            container,
            style: style !== null ? styles[style] : null,
        })

        if (events) {
            Object.keys(events).forEach(function setMapEvent(key) {
                map.on(key, events[key])
            })
        }

        this.map = map
    }
    componentWillUnmount() {
        this.map.off()
    }
    componentWillReceiveProps({bounds = null}) {
        if (bounds !== null && bounds !== this.props.bounds) {
            const {bbox, options} = bounds
            if (bbox) {
                this.map.fitBounds(bbox, options)
            }
        }
    }
    render() {
        return (
            <div ref='container' styleName='Container' >
                {this.map && this.props.children}
            </div>
        )
    }
}
