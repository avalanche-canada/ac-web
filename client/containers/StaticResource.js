import { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchStaticResource } from 'api'

export default class StaticResource extends Component {
    static propTypes = {
        resource: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    state = {
        data: undefined,
        isLoading: false,
        isLoaded: false,
        isError: false,
        error: undefined,
    }
    setData = data => {
        this.setState({
            data,
            isLoading: false,
            isLoaded: true,
        })
    }
    setError = error => {
        this.setState({
            error,
            isLoading: false,
            isError: true,
        })
    }
    fetch = () => {
        const { resource } = this.props

        fetchStaticResource(resource).then(this.setData, this.setError)
    }
    componentDidMount() {
        this.setState({ isLoading: true }, this.fetch)
    }
    render() {
        return this.props.children(this.state)
    }
}
