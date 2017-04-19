import {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class Delay extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        elapse: PropTypes.number,
    }
    static defaultProps = {
        elapse: 0
    }
    state = {
        visible: false
    }
    componentWillMount() {
        this.timeoutId = window.setTimeout(() => {
            this.setState({
                visible: true
            })
        }, this.props.elapse)
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeoutId)
    }
    render() {
        return this.state.visible ? this.props.children || null : null
    }
}
