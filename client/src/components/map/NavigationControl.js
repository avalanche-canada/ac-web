import React, {PropTypes, Component} from 'react'
import mapbox from 'services/mapbox/map'

export default class NavigationControl extends Component {
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    get map() {
        return this.context.map
    }
    componentDidMount() {
        this.control = new mapbox.NavigationControl()

        this.map.addControl(this.control, 'bottom-right')
    }
    componentWillUnmount() {
        this.map.removeControl(this.control)
    }
    render() {
        return null
    }
}
