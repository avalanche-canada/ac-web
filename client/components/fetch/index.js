import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Fetch extends PureComponent {
    static propTypes = {
        url: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    state = {
        isLoading: false,
        isError: false,
        data: null,
    }
    fetch() {
        this.setState({ isLoading: true, isError: false }, () => {
            fetch(this.props.url).then(response => response.json()).then(
                data =>
                    this.setState({
                        isLoading: false,
                        isError: false,
                        data,
                    }),
                error =>
                    this.setState({
                        isLoading: false,
                        isError: true,
                        data: error,
                    })
            )
        })
    }
    componentDidMount() {
        this.fetch()
    }
    componentDidUpdate() {
        this.fetch()
    }
    render() {
        return this.props.children(this.state)
    }
}
