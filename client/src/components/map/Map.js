import React, {PropTypes, Component} from 'react'
import CSSModule from 'react-css-modules'
import mapbox, {styles} from 'services/mapbox/map'
import {Revelstoke} from 'constants/map/locations'
import {Canadian} from 'constants/map/bounds'
import {captureException} from 'services/raven'

function noop() {}
const {LngLatBounds} = mapbox
const STYLES = Object.keys(styles)
const {bool, func, number, string, object, shape, node, arrayOf, instanceOf, oneOf} = PropTypes
const EVENTS = new Map([
    ['onWebglcontextlost', 'webglcontextlost'],
    ['onWebglcontextrestored', 'webglcontextrestored'],
    ['onMoveend', 'moveend'],
    ['onMove', 'move'],
    ['onMovestart', 'movestart'],
    ['onDblclick', 'dblclick'],
    ['onRender', 'render'],
    ['onMouseout', 'mouseout'],
    ['onMousedown', 'mousedown'],
    ['onMouseup', 'mouseup'],
    ['onMousemove', 'mousemove'],
    ['onTouchstart', 'touchstart'],
    ['onTouchend', 'touchend'],
    ['onTouchmove', 'touchmove'],
    ['onTouchcancel', 'touchcancel'],
    ['onClick', 'click'],
    ['onLoad', 'load'],
    ['onError', 'error'],
    ['onContextmenu', 'contextmenu'],
    ['onZoom', 'zoom'],
    ['onZoomend', 'zoomend'],
    ['onZoomstart', 'zoomstart'],
    ['onBoxzoomstart', 'boxzoomstart'],
    ['onBoxzoomend', 'boxzoomend'],
    ['onBoxzoomcancel', 'boxzoomcancel'],
    ['onRotateend', 'rotateend'],
    ['onRotate', 'rotate'],
    ['onRotatestart', 'rotatestart'],
    ['onDragstart', 'dragstart'],
    ['onDrag', 'drag'],
    ['onDragend', 'dragend'],
    ['onPitch', 'pitch'],
])

export default class MapComponent extends Component {
    static propTypes = {
        children: node,
        style: oneOf(STYLES),
        center: arrayOf(number),
        zoom: number,
        bearing: number,
        pitch: number,
        minZoom: number,
        maxZoom: number,
        interactive: bool,
        bearingSnap: number,
        classes: arrayOf(string),
        attributionControl: bool,
        failIfMajorPerformanceCaveat: bool,
        preserveDrawingBuffer: bool,
        maxBounds: instanceOf(LngLatBounds),
        scrollZoom: bool,
        boxZoom: bool,
        dragRotate: bool,
        dragPan: bool,
        keyboard: bool,
        doubleClickZoom: bool,
        touchZoomRotate: bool,
        trackResize: bool,
        workerCount: number,
        onWebglcontextlost: func,
        onWebglcontextrestored: func,
        onMoveend: func,
        onMove: func,
        onMovestart: func,
        onDblclick: func,
        onRender: func,
        onMouseout: func,
        onMousedown: func,
        onMouseup: func,
        onMousemove: func,
        onTouchstart: func,
        onTouchend: func,
        onTouchmove: func,
        onTouchcancel: func,
        onClick: func,
        onLoad: func,
        onError: func,
        onContextmenu: func,
        onZoom: func,
        onZoomend: func,
        onZoomstart: func,
        onBoxzoomstart: func,
        onBoxzoomend: func,
        onBoxzoomcancel: func,
        onRotateend: func,
        onRotate: func,
        onRotatestart: func,
        onDragstart: func,
        onDrag: func,
        onDragend: func,
        onPitch: func,
        // Custom, i.e. not part of the mapbox.Map class
        bounds: shape({
            bbox: instanceOf(LngLatBounds),
            options: object,
        }),
        onInitializationError: func,
    }
    static defaultProps = {
        style: 'default',
        zoom: 10,
        center: Revelstoke,
        maxBounds: Canadian,
        attributionControl: false,
        onInitializationError: noop,
    }
    static childContextTypes = {
        map: object,
    }
    state = {
        map: null
    }
    constructor(props) {
        super(props)

        if (!mapbox.supported()) {
            this.componentDidMount = noop
        }
    }
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
        const {style, children, onInitializationError, ...props} = this.props

        try {
            const map = new mapbox.Map({
                ...props,
                container,
                style: style !== null ? styles[style] : null,
            })

            EVENTS.forEach(function addMapEvent(name, method) {
                if (typeof props[method] === 'function') {
                    map.on(name, props[method])
                }
            })

            this.map = map
        } catch (error) {
            captureException(error)
            onInitializationError(error)
        }
    }
    componentWillUnmount() {
        if (this.map) {
            this.map.off()
        }
    }
    componentWillReceiveProps({bounds = null}) {
        if (!this.map) {
            return
        }

        if (bounds !== null && bounds !== this.props.bounds) {
            this.map.fitBounds(bounds.bbox, bounds.options)
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
