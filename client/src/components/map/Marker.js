import React, {Component, PropTypes} from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import mapbox from 'mapbox/map'

const {LngLat} = mapbox
const {assign} = Object
function createMarker({element, lnglat, options, onClick}) {
    if (onClick) {
        element = assign(element, {onclick: onClick})
    }

    return new mapbox.Marker(element, options).setLngLat(lnglat)
}

export default class Marker extends Component {
    static propTypes = {
        lnglat: PropTypes.instanceOf(LngLat).isRequired,
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
        const {element, lnglat, options} = nextProps

        if (this.props.element !== element) {
            this.marker = createMarker(nextProps)
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
