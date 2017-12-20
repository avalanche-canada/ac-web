import { Component } from 'react'
import { connect } from 'react-redux'
import { parse } from 'utils/hash'
import { receiveToken } from 'actions/auth'

@connect(null, { receiveToken })
export default class LoginComplete extends Component {
    componentDidMount() {
        const { location, history, receiveToken } = this.props
        const { id_token, access_token, state = '/' } = parse(location.hash)

        if (id_token && access_token) {
            receiveToken(id_token, access_token)
        }

        history.replace(state)
    }
    render() {
        return null
    }
}
