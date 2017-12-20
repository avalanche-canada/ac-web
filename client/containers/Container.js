import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Container extends PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
        load: PropTypes.func,
        params: PropTypes.object,
        data: PropTypes.object,
    }
    static defaultProps = {
        data: {},
    }
    load() {
        const { load, params } = this.props

        if (typeof load === 'function') {
            load(params)
        }
    }
    componentDidMount() {
        this.load()
    }
    componentDidUpdate() {
        this.load()
    }
    render() {
        return this.props.children(this.props.data)
    }
}
