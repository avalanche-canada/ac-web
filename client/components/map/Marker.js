import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import noop from 'lodash/noop'

const { LngLat } = mapbox

export default class Marker extends StaticComponent {
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
    get element() {
        return this.props.element
    }
    remove() {
        if (this.marker) {
            this.marker.remove()
        }
    }
    createMarker({ element, lngLat, options, onClick, draggable }) {
        // TODO: Remove that. Should by provided as part of the element
        if (onClick) {
            Object.assign(element, {
                onclick: event => onClick(this.props, event),
            })
        }

        if (draggable) {
            Object.assign(element, {
                onmousedown: this.handleMousedown,
            })
            element.classList.add('draggable-map-marker')
        }

        return new mapbox.Marker(element, options).setLngLat(lngLat)
    }
    handleMousedown = ({ target }) => {
        const { map } = this
        const canvas = map.getCanvas()

        canvas.style.cursor = 'move'
        target.style.pointerEvents = 'none'

        map.dragPan.disable()

        map.on('mousemove', this.handleMapMousemove)
        map.on('mouseup', this.handleMapMouseup)
    }
    handleMapMousemove = event => {
        this.marker.setLngLat(event.lngLat)
        this.element.style.transform += ' scale(1.25)'
    }
    handleMapMouseup = event => {
        const { map } = this
        const canvas = map.getCanvas()

        canvas.style.cursor = ''
        this.element.style.pointerEvents = ''

        map.dragPan.enable()

        map.off('mousemove', this.handleMapMousemove)
        map.off('mouseup', this.handleMapMouseup)

        this.props.onDragEnd(event)
    }
    componentDidMount() {
        this.marker = this.createMarker(this.props)
    }
    componentWillReceiveProps(nextProps) {
        const { element, lngLat } = nextProps

        if (this.element !== element) {
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
    render() {
        return null
    }
}
