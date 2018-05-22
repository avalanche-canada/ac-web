import { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import SliceComponents from '../slice'

export default class SliceZone extends PureComponent {
    static propTypes = {
        value: PropTypes.arrayOf(PropTypes.object).isRequired,
        components: PropTypes.instanceOf(Map),
    }
    static defaultProps = {
        components: SliceComponents,
    }
    renderSlice = ({ type, ...props }, index) =>
        createElement(
            this.props.components.get(type),
            Object.assign(props, { key: index })
        )
    render() {
        return this.props.value.map(this.renderSlice)
    }
}
