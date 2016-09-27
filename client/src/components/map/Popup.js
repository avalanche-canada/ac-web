import React, { PropTypes, Component} from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import mapbox from 'services/mapbox/map'

const {LngLat} = mapbox
const ANCHORS = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']

export default class Popup extends Component {
    static propTypes = {
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        show: PropTypes.bool,
        children: PropTypes.node.isRequired,
        closeButton: PropTypes.bool,
        closeOnClick: PropTypes.bool,
        anchor: PropTypes.oneOf(ANCHORS),
    }
    static defaultProps = {
        show: false,
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    popup = null
    div = document.createElement('div')
    get map() {
        return this.context.map
    }
    createPopup() {
        const {map, div} = this
        const {longitude, latitude, children, show, ...options} = this.props
        const popup = new mapbox.Popup(options)

        render(children, div, function mountPopup() {
            const latlng = new LngLat(longitude, latitude)

            popup.setLngLat(latlng)
            popup.setDOMContent(div)

            if (show) {
                popup.addTo(map)
            }
        })

        this.popup = popup
    }
    destroyPopup() {
        const {popup, div} = this

        popup.remove()
        unmountComponentAtNode(div)
    }
    componentWillMount() {
        this.createPopup()
    }
    componentDidUpdate() {
        this.destroyPopup()
        this.createPopup()
    }
    componentWillUnmount() {
        this.destroyPopup()
    }
    render() {
        return null
    }
}
