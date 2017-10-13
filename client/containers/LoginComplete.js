import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { parse } from '~/utils/hash'
import { receiveToken } from '~/actions/auth'

function LoginComplete() {
    return null
}

export default compose(
    connect(null, { receiveToken }),
    lifecycle({
        componentDidMount() {
            const { location, history, receiveToken } = this.props
            const { id_token, access_token, state = '/' } = parse(location.hash)

            if (id_token && access_token) {
                receiveToken(id_token, access_token)
            }

            history.replace(state)
        },
    })
)(LoginComplete)
