import { PureComponent } from 'react'
import PropTypes from 'prop-types'

// TODO: HOOKS

export default class Delay extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        elapse: PropTypes.number,
    }
    static defaultProps = {
        children: null,
        elapse: 0,
    }
    state = {
        visible: false,
    }
    componentDidMount() {
        this.timeoutId = window.setTimeout(() => {
            this.setState({
                visible: true,
            })
        }, this.props.elapse)
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeoutId)
    }
    render() {
        return this.state.visible ? this.props.children : null
    }
}
