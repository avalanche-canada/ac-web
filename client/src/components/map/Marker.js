import React, {Component, PropTypes} from 'react'
import mapbox from 'services/mapbox/map'

const {LngLat} = mapbox
const {assign} = Object
function createMarker(marker) {
    const {element, lngLat, options, onClick} = marker

    if (onClick) {
        assign(element, {
            onclick: event => onClick(marker, event)
        })
    }

    return new mapbox.Marker(element, options).setLngLat(lngLat)
}

export default class Marker extends Component {
    static propTypes = {
        lngLat: PropTypes.instanceOf(LngLat).isRequired,
        element: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        options: PropTypes.object,
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
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
    componentWillUnmount() {
        this.remove()
    }
    remove() {
        const {marker} = this

        if (marker) {
            marker.remove()
        }
    }
    componentWillReceiveProps(nextProps) {
        const {element, lngLat, options} = nextProps

        if (this.props.element !== element) {
            this.marker = createMarker(nextProps)
            return
        }

        if (this.props.lngLat !== lngLat) {
            this.marker.setLngLat(lngLat)
        }
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        this.marker = createMarker(this.props)

        return null
    }
}
