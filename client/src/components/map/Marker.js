import React, {Component, PropTypes} from 'react'
import mapboxgl from 'mapboxgl'

const {LngLat} = mapboxgl
function createMarker({element, lnglat}) {
    return new mapboxgl.Marker(element).setLngLat(lnglat)
}

export default class Marker extends Component {
    static propTypes = {
        lnglat: PropTypes.instanceOf(LngLat).isRequired,
        element: PropTypes.object.isRequired,
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    _marker = null
    set marker(marker) {
        this._marker = marker

        this.remove()

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
    componentWillReceiveProps({element, lnglat}) {

        if (this.props.element !== element) {
            this.marker = createMarker({element, lnglat})
            return
        }

        if (this.props.lnglat !== lnglat) {
            this.marker.setLngLat(lnglat)
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
