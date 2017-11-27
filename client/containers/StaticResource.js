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
    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            fetchStaticResource(this.props.resource).then(
                data => {
                    this.setState({
                        data,
                        isLoading: false,
                        isLoaded: true,
                    })
                },
                error => {
                    this.setState({
                        error,
                        isLoading: false,
                        isError: true,
                    })
                }
            )
        })
    }
    render() {
        return this.props.children(this.state)
    }
}
