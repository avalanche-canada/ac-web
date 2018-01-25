import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Universal extends Component {
    static propTypes = {
        didMount: PropTypes.func,
        willReceiveProps: PropTypes.func,
        children: PropTypes.func.isRequired,
    }
    get args() {
        return {
            props: this.props,
        }
    }
    componentDidMount() {
        if (typeof this.props.didMount === 'function') {
            this.props.didMount(this.args)
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (typeof this.props.willReceiveProps === 'function') {
            this.props.willReceiveProps({ ...this.args, nextProps, nextState })
        }
    }
    render() {
        return this.props.children(this.args)
    }
}
