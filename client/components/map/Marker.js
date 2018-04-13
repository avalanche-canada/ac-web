import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import mapbox from 'mapbox-gl/dist/mapbox-gl'

const { LngLat } = mapbox

export default class Marker extends StaticComponent {
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

        marker.addTo(this.context.map)
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
        // TODO: Remove that. Should by provided as part of the element
        if (onClick) {
            Object.assign(element, {
                onclick: event => onClick(this.props, event),
            })
        }

        return new mapbox.Marker(element, options).setLngLat(lngLat)
    }
    componentDidMount() {
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
        return null
    }
}
