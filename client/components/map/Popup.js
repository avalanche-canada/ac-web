import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import mapbox from 'services/mapbox/map'

const { LngLat } = mapbox
const ANCHORS = [
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]

export default class Popup extends Component {
    static propTypes = {
        lngLat: PropTypes.instanceOf(LngLat).isRequired,
        children: PropTypes.element.isRequired,
        options: PropTypes.shape({
            closeButton: PropTypes.bool,
            closeOnClick: PropTypes.bool,
            anchor: PropTypes.oneOf(ANCHORS),
            offset: PropTypes.object,
        }),
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.container = document.createElement('div')
        this.popup = new mapbox.Popup(this.props.options)
    }
    componentDidUpdate() {
        ReactDOM.render(this.props.children, this.container, () => {
            this.popup
                .setDOMContent(this.container)
                .setLngLat(this.props.lngLat)
                .addTo(this.context.map)
        })
    }
    componentWillUnmount() {
        this.popup.remove()
    }
    render() {
        return null
    }
}
