import { Component } from 'react'

export default class Bundle extends Component {
    state = {
        module: null,
    }
    componentDidMount() {
        this.load()
    }
    componentDidUpdate({ load }) {
        if (load !== this.props.load) {
            this.setState({ module: null }, this.load)
        }
    }
    load = () => {
        this.props.load(module => {
            this.setState({
                module: module.default,
            })
        })
    }
    render() {
        return this.props.children(this.state.module)
    }
}
