import React, {PropTypes, Component} from 'react'
import CSSModule from 'react-css-modules'
import mapbox, {styles} from 'mapbox/map'
import {Revelstoke} from 'constants/map/locations'
import {Canadian} from 'constants/map/bounds'
import css from './Map.css'

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

@CSSModule(css)
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
    }
    static defaultProps = {
        style: 'default',
        zoom: 10,
        center: Revelstoke,
        maxBounds: Canadian,
        attributionControl: false,
    }
    static childContextTypes = {
        map: object,
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
        const {style, children, bounds, ...rest} = this.props

        const map = new mapbox.Map({
            ...rest,
            container,
            style: style !== null ? styles[style] : null,
        })

        EVENTS.forEach(function addMapEvent(name, method) {
            if (rest[method]) {
                map.on(name, rest[method])
            }
        })

        this.map = map
    }
    componentWillUnmount() {
        this.map.off()
    }
    componentWillReceiveProps({bounds = null, ...rest}) {
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
