import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Show extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        after: PropTypes.number.isRequired,
    }
    state = {
        visible: this.props.after === 0,
    }
    componentDidMount() {
        this.setTimeout(this.props.after)
    }
    componentWillReceiveProps({ after }) {
        if (after !== this.props.after && after > 0) {
            this.setState({ visible: false }, () => {
                this.clearTimeout()
                this.setTimeout(after)
            })
        }
    }
    componentWillUnmount() {
        this.clearTimeout()
    }
    setTimeout(after) {
        this.timeoutId = setTimeout(() => {
            this.setState({ visible: true })
        }, after)
    }
    clearTimeout() {
        clearTimeout(this.timeoutId)
    }
    render() {
        return this.state.visible ? this.props.children : null
    }
}
