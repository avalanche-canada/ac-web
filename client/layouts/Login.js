import React, { Component } from 'react'
import { navigate } from '@reach/router'
import * as Auth from 'contexts/auth'

export default class Login extends Component {
    login = ({ isAuthenticated, login }) => {
        if (!isAuthenticated) {
            login().then(() => {
                const params = new URLSearchParams(this.props.location.search)

                navigate(params.has('from') ? params.get('from') : '/')
            })
        }

        return null
    }
    render() {
        return <Auth.Consumer>{this.login}</Auth.Consumer>
    }
}
