import React from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import { Consumer } from './Context'
import mapbox from 'mapbox-gl/dist/mapbox-gl'

// TODO: Simplify implementation

export default class Marker extends StaticComponent {
    static propTypes = {
        lngLat: PropTypes.arrayOf(PropTypes.number).isRequired,
        element: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        options: PropTypes.object,
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
    remove() {
        if (this.marker) {
            this.marker.remove()
        }
    }
    createMarker({ element, lngLat, options, onClick }) {
        if (typeof onClick === 'function') {
            Object.assign(element, {
                onclick: event => onClick(this.props, event),
            })
        }

        return new mapbox.Marker(element, options).setLngLat(lngLat)
    }
    addMarker = map => {
        if (!map) {
            return
        }

        this.map = map
        this.marker = this.createMarker(this.props)
    }
    componentWillReceiveProps(nextProps) {
        const { element, lngLat } = nextProps

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
    render() {
        return <Consumer>{this.addMarker}</Consumer>
    }
}
