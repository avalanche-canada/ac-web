import React, {PropTypes, Component} from 'react'
import Control from 'services/mapbox/controls/fullscreen'

export default class FullscreenControl extends Component {
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    get map() {
        return this.context.map
    }
    componentDidMount() {
        this.control = new Control()

        this.map.addControl(this.control, 'bottom-right')
    }
    componentWillUnmount() {
        this.map.removeControl(this.control)
    }
    render() {
        return null
    }
}
