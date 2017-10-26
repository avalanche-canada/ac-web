import { Component } from 'react'

export default class Bundle extends Component {
    state = {
        module: null,
    }
    componentWillMount() {
        this.load(this.props)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }
    load(props) {
        this.setState({
            module: null,
        })
        props.load(module => {
            this.setState({
                module: module.default,
            })
        })
    }
    render() {
        return this.props.children(this.state.module)
    }
}
