import { Component } from 'react'
import { navigate } from '@reach/router'
import AuthContext from 'contexts/auth'

export default class LoginComplete extends Component {
    static contextType = AuthContext
    componentDidMount() {
        const { hash } = this.props.location

        this.context.resume(hash).then(props => {
            navigate(props.state || '/')
        })
    }
    render() {
        return null
    }
}
