import React, { PropTypes, createElement, Component } from 'react'
import CSSModule from 'react-css-modules'
import mapboxgl, {styles} from 'mapboxgl'
import css from './Map.css'

const STYLES = Object.keys(styles)

const {LngLatBounds, LngLat} = mapboxgl
const sw = new LngLat(-174, 35)
const ne = new LngLat(-48, 90)
const canadianBounds = new LngLatBounds(sw, ne)
const revy = [-118.1957, 50.9981]

@CSSModule(css)
export default class Map extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
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
        bounds: PropTypes.instanceOf(LngLatBounds),
        scrollZoom: PropTypes.bool,
        boxZoom: PropTypes.bool,
        dragRotate: PropTypes.bool,
        dragPan: PropTypes.bool,
        keyboard: PropTypes.bool,
        doubleClickZoom: PropTypes.bool,
        touchZoomRotate: PropTypes.bool,
        trackResize: PropTypes.bool,
        events: PropTypes.object,
    }
    static defaultProps = {
        style: 'default',
        center: revy, // Revy: center of universe ;)
        zoom: 10,
        maxBounds: canadianBounds,
        attributionControl: false,
    }
    static childContextTypes = {
        map: PropTypes.object.isRequired,
    }
    state = {}
    get map() {
        return this.state.map
    }
    getChildContext() {
        return {
            map: this.map
        }
    }
    componentDidMount() {
        const {container} = this.refs
        const {style, children, events, ...rest} = this.props
        const map = new mapboxgl.Map({
            ...rest,
            container,
            style: styles[style],
        })

        if (events) {
            Object.keys(events).forEach(function setMapEvent(key) {
                map.on(key, events[key])
            })
        }

        this.setState({map})
    }
    componentWillUnmount() {
        const {map} = this

        map.off()

        // setTimeout(function removeMap() {
        //     map.remove()
        // }, 1)
    }
    componentWillReceiveProps({bounds = null}) {
        if (bounds === null || bounds === this.props.bounds) {
            return
        }

        this.map.fitBounds(bounds, {
            offset: [125, 0],
            padding: 25,
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.children !== this.props.children,
        )
    }
    render() {
        const {map} = this
        const {children} = this.props

        return (
            <div ref='container' styleName='Container' >
                {map && children}
            </div>
        )
    }
}
