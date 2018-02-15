import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapbox, { styles } from 'services/mapbox/map'
import { Canadian } from 'constants/map/bounds'
import './Map.css'

function toJSON(style) {
    if (!style) {
        return null
    }

    if (typeof style.toJSON === 'function') {
        return style.toJSON()
    }

    return style
}

const { LngLatBounds } = mapbox
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
    ['onResize', 'resize'],
    ['onSourcedata', 'sourcedata'],
    ['onSourcedataloading', 'sourcedataloading'],
])

export default class MapComponent extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.oneOfType([
            PropTypes.oneOf(Object.keys(styles)),
            PropTypes.object,
        ]).isRequired,
        containerStyle: PropTypes.object,
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
        onSourcedata: PropTypes.func,
        onSourcedataloading: PropTypes.func,
    }
    static defaultProps = {
        style: null,
        maxBounds: Canadian,
    }
    static childContextTypes = {
        map: PropTypes.object,
    }
    state = {
        map: null,
        ready: false,
    }
    get map() {
        return this.state.map
    }
    setContainer = container => (this.container = container)
    getChildContext() {
        return {
            map: this.map,
        }
    }
    componentDidMount() {
        const { container } = this

        if (!container) {
            return
        }

        const { style, ...props } = this.props
        const map = new mapbox.Map({
            ...props,
            container,
            style: typeof style === 'string' ? styles[style] : toJSON(style),
        })

        EVENTS.forEach((name, method) => {
            if (typeof props[method] === 'function') {
                map.on(name, props[method])
            }
        })

        map.once('styledata', () => {
            this.setState({
                ready: true,
            })
        })

        this.setState({ map })
    }
    componentWillUnmount() {
        if (this.map) {
            this.map.off()
        }
    }
    componentWillReceiveProps({ style }) {
        if (!this.map || style === this.props.style) {
            return
        }

        if (this.props.style === null) {
            this.style = style
        } else {
            this.updateStyle(style)
        }
    }
    updateStyle = style => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }

        if (this.map.loaded()) {
            this.style = style
        } else {
            this.map.once('load', this.updateStyle.bind(this, style))
            // Should be removed
            // More details at https://github.com/mapbox/mapbox-gl-draw/issues/572
            this.timeoutId = setTimeout(this.updateStyle, 50, style)
        }
    }
    set style(style) {
        this.map.setStyle(toJSON(style))
    }
    shouldComponentUpdate({ children }, { ready }) {
        return children !== this.props.children || ready !== this.state.ready
    }
    get safe() {
        return this.state.ready && this.state.map
    }
    render() {
        return (
            <div ref={this.setContainer} style={this.props.containerStyle}>
                {this.safe && this.props.children}
            </div>
        )
    }
}
