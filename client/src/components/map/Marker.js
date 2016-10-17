import React, {Component, PropTypes} from 'react'
import mapbox from 'services/mapbox/map'

const {LngLat} = mapbox
const {assign} = Object
function noop() {}

export default class Marker extends Component {
    static propTypes = {
        lngLat: PropTypes.instanceOf(LngLat).isRequired,
        element: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        options: PropTypes.object,
        // TODO: Draggable marker is comming soonish
        // https://github.com/mapbox/mapbox-gl-js/issues/3087
        draggable: PropTypes.bool,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    static defaultProps = {
        onDragStart: noop,
        onDragEnd: noop,
    }
    _marker = null
    set marker(marker) {
        this.remove()

        this._marker = marker

        marker.addTo(this.map)
    }
    get marker() {
        return this._marker
    }
    get map() {
        return this.context.map
    }
    remove() {
        if (this.marker) {
            this.marker.remove()
        }
    }
    createMarker({element, lngLat, options, onClick, draggable}) {
        if (onClick) {
            assign(element, {
                onclick: event => onClick(marker, event)
            })
        }

        if (draggable) {
            assign(element, {
                draggable,
                onmousedown: this.handleMousedown,
                ondragstart: this.handleDragStart,
                ondragend: this.handleDragEnd,
            })
        }

        return new mapbox.Marker(element, options).setLngLat(lngLat)
    }
    handleMousedown = event => {
        this.map.dragPan.disable()
    }
    handleDragStart = event => {
        // required for the drag api to work
    }
    handleDragEnd = event => {
        const {map, marker} = this
        const {offsetX, offsetY} = event
        const lngLat = map.unproject(
            map.project(marker.getLngLat()).add({
                x: offsetX - 12,
                y: offsetY - 12,
            })
        )

        marker.setLngLat(lngLat)
        map.dragPan.enable()

        this.props.onDragEnd(lngLat)
    }
    componentDidMount() {
        this.marker = this.createMarker(this.props)
    }
    componentWillReceiveProps(nextProps) {
        const {element, lngLat, options} = nextProps

        if (this.props.element !== element) {
            this.marker = this.createMarker(nextProps)
            return
        }

        if (this.props.lngLat !== lngLat) {
            this.marker.setLngLat(lngLat)
        }
    }
    componentWillUnmount() {
        this.remove()
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        return null
    }
}
