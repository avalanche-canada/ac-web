import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Container extends PureComponent {
    static propTypes = {
        children: PropTypes.func.isRequired,
        load: PropTypes.func,
        data: PropTypes.object,
    }
    static defaultProps = {
        data: {},
    }
    componentDidMount() {
        const { load } = this.props

        if (typeof load == 'function') {
            load()
        }
    }
    render() {
        return this.props.children(this.props.data)
    }
}
