import { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

export default class Universal extends Component {
    static propTypes = {
        didMount: PropTypes.func,
        willReceiveProps: PropTypes.func,
        children: PropTypes.func.isRequired,
    }
    static defaultProps = {
        didMount: noop,
        willReceiveProps: noop,
        children: noop,
    }
    get args() {
        return {
            props: this.props,
        }
    }
    componentDidMount() {
        this.props.didMount(this.args)
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.props.willReceiveProps({ ...this.args, nextProps, nextState })
    }
    render() {
        return this.props.children(this.args)
    }
}
