import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '../Api'

export default class Fetch extends PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
        predicates: PropTypes.array.isRequired,
        options: PropTypes.object,
    }
    state = {
        isLoading: false,
        isError: false,
        data: null,
    }
    fetch() {
        this.setState({ isLoading: true, isError: false }, () => {
            const { predicates, options } = this.props

            Query(predicates, options).then(
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
        // this.fetch()
    }
    render() {
        return this.props.children(this.state)
    }
}
