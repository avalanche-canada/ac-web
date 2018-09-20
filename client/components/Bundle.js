import { Component } from 'react'

export default class Bundle extends Component {
    state = {
        module: null,
    }
    componentDidMount() {
        this.load(this.props)
    }
    componentDidUpdate({ load }) {
        if (load !== this.props.load) {
            this.load(this.props)
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
