import PropTypes from 'prop-types'
import Universal from 'components/Universal'

export default class Connector extends Universal {
    static propTypes = {
        ...Universal.propTypes,
        data: PropTypes.object.isRequired,
    }
    render() {
        return this.props.children(this.props.data)
    }
}
