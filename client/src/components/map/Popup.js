import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import mapbox from 'services/mapbox/map'

const {LngLat} = mapbox
const ANCHORS = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']

export default class Popup extends Component {
    static propTypes = {
        lngLat: PropTypes.instanceOf(LngLat).isRequired,
        show: PropTypes.bool,
        children: PropTypes.element.isRequired,
        options: PropTypes.shapeOf({
            closeButton: PropTypes.bool,
            closeOnClick: PropTypes.bool,
            anchor: PropTypes.oneOf(ANCHORS),
            offset: PropTypes.object,
        }),
    }
    static defaultProps = {
        show: false,
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    popup = null
    constructor(props) {
        super(props)

        this.container = document.createElement('div')
    }
    get map() {
        return this.context.map
    }
    createPopup() {
        const {lngLat, children, show, options} = this.props
        const popup = new mapbox.Popup(options)

        ReactDOM.render(children, this.container)

        popup.setLngLat(lngLat)
        popup.setDOMContent(this.container)

        if (show) {
            popup.addTo(this.map)
        }

        this.popup = popup
    }
    destroyPopup() {
        this.popup.remove()
        ReactDOM.unmountComponentAtNode(this.container)
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
