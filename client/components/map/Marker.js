import { Component } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'

export default class Marker extends Component {
    static propTypes = {
        map: PropTypes.object.isRequired,
        lngLat: PropTypes.arrayOf(PropTypes.number).isRequired,
        element: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        options: PropTypes.object,
    }
    remove() {
        if (this.marker) {
            this.marker.remove()
        }
    }
    createMarker() {
        const { element, lngLat, options, onClick, map } = this.props

        if (typeof onClick === 'function') {
            Object.assign(element, {
                onclick: event => onClick(this.props, event),
            })
        }

        this.marker = new mapbox.Marker(element, options)
            .setLngLat(lngLat)
            .addTo(map)
    }
    componentDidMount() {
        this.createMarker()
    }
    componentDidUpdate({ element, lngLat }) {
        if (this.props.element !== element) {
            this.remove()
            this.createMarker()
        }

        if (this.props.lngLat !== lngLat) {
            this.marker.setLngLat(this.props.lngLat)
        }
    }
    componentWillUnmount() {
        this.remove()
    }
    render() {
        return null
    }
}
