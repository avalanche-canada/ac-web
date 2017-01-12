import React, {PropTypes, Component} from 'react'
import CSSModule from 'react-css-modules'
import Immutable from 'immutable'
import mapbox, {styles} from 'services/mapbox/map'
import {Canadian} from 'constants/map/bounds'
import {captureException} from 'services/raven'
import noop from 'lodash/noop'

function toJSON(style) {
    if (!style) {
        return null
    }

    if (typeof style.toJSON === 'function') {
        return style.toJSON()
    }

    return style
}

const {LngLatBounds} = mapbox
const STYLES = Object.keys(styles)
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
        children: PropTypes.node,
        style: PropTypes.oneOfType([PropTypes.oneOf(STYLES), PropTypes.object]).isRequired,
        center: PropTypes.arrayOf(number),
        zoom: PropTypes.number,
        bearing: PropTypes.number,
        pitch: PropTypes.number,
        minZoom: PropTypes.number,
        maxZoom: PropTypes.number,
        interactive: PropTypes.bool,
        bearingSnap: PropTypes.number,
        classes: PropTypes.arrayOf(string),
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
        workerCount: PropTypes.number,
        onWebglcontextlost: PropTypes.func,
        onWebglcontextrestored: PropTypes.func,
        onMoveend: PropTypes.func,
        onMove: PropTypes.func,
        onMovestart: PropTypes.func,
        onDblclick: PropTypes.func,
        onRender: PropTypes.func,
        onMouseout: PropTypes.func,
        onMousedown: PropTypes.func,
        onMouseup: PropTypes.func,
        onMousemove: PropTypes.func,
        onTouchstart: PropTypes.func,
        onTouchend: PropTypes.func,
        onTouchmove: PropTypes.func,
        onTouchcancel: PropTypes.func,
        onClick: PropTypes.func,
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        onContextmenu: PropTypes.func,
        onZoom: PropTypes.func,
        onZoomend: PropTypes.func,
        onZoomstart: PropTypes.func,
        onBoxzoomstart: PropTypes.func,
        onBoxzoomend: PropTypes.func,
        onBoxzoomcancel: PropTypes.func,
        onRotateend: PropTypes.func,
        onRotate: PropTypes.func,
        onRotatestart: PropTypes.func,
        onDragstart: PropTypes.func,
        onDrag: PropTypes.func,
        onDragend: PropTypes.func,
        onPitch: PropTypes.func,
        // Custom, i.e. not part of the mapbox.Map class
        onInitializationError: PropTypes.func,
    }
    static defaultProps = {
        maxBounds: Canadian,
        attributionControl: false,
        onInitializationError: noop,
    }
    static childContextTypes = {
        map: PropTypes.object,
    }
    state = {
        map: null,
        isReady: false,
    }
    constructor(props) {
        super(props)

        if (!mapbox.supported()) {
            this.componentDidMount = noop
        }
    }
    getChildContext() {
        return {
            map: this.state.map
        }
    }
    componentDidMount() {
        const {container} = this.refs
        const {style, children, onInitializationError, ...props} = this.props

        try {
            const map = new mapbox.Map({
                ...props,
                container,
                style: typeof style === 'string' ? styles[style] : toJSON(style),
            })

            EVENTS.forEach(function addMapEvent(name, method) {
                if (typeof props[method] === 'function') {
                    map.on(name, props[method])
                }
            })

            map.once('styledata', event => this.setState({
                isReady: true
            }))

            this.setState({map})
        } catch (error) {
            captureException(error)
            onInitializationError(error)
        }
    }
    componentWillUnmount() {
        if (this.state.map) {
            this.state.map.off()
        }
    }
    componentWillReceiveProps({style}) {
        const {map, isReady} = this.state

        if (map && style !== this.props.style) {
            if (this.props.style === null) {
                map.setStyle(toJSON(style))
            } else if (isReady) {
                map.setStyle(toJSON(style))
            }
        }
    }
    shouldComponentUpdate({children}) {
        return children !== this.props.children
    }
    render() {
        return (
            <div ref='container' style={this.props.containerStyle}>
                {this.state.map && this.props.children}
            </div>
        )
    }
}
