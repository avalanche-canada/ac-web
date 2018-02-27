import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

export default class Control extends StaticComponent {
    static propTypes = {
        factory: PropTypes.func.isRequired,
        position: PropTypes.oneOf([
            TOP_LEFT,
            TOP_RIGHT,
            BOTTOM_LEFT,
            BOTTOM_RIGHT,
        ]),
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    static defaultProps = {
        position: BOTTOM_RIGHT,
    }
    get map() {
        return this.context.map
    }
    componentDidMount() {
        const { position, factory } = this.props
        const control = (this.control = factory())

        this.map.addControl(control, position)
    }
    componentWillUnmount() {
        this.map.removeControl(this.control)
    }
    render() {
        return null
    }
}
