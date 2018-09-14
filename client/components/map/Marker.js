import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import mapbox from 'mapbox-gl/dist/mapbox-gl'

// TODO: Simplify implementation

export default class Marker extends StaticComponent {
    static propTypes = {
        map: PropTypes.object.isRequired,
        lngLat: PropTypes.arrayOf(PropTypes.number).isRequired,
        element: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        options: PropTypes.object,
    }
    _marker = null
    set marker(marker) {
        this.remove()

        this._marker = marker

        marker.addTo(this.props.map)
    }
    get marker() {
        return this._marker
    }
    remove() {
        if (this.marker) {
            this.marker.remove()
        }
    }
    createMarker() {
        const { element, lngLat, options, onClick } = this.props

        if (typeof onClick === 'function') {
            Object.assign(element, {
                onclick: event => onClick(this.props, event),
            })
        }

        return new mapbox.Marker(element, options).setLngLat(lngLat)
    }
    componentDidMount() {
        this.marker = this.createMarker()
    }
    componentDidUpdate({ element, lngLat }) {
        if (this.props.element !== element) {
            this.marker = this.createMarker()
            return
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
