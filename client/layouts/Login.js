import React, { Component } from 'react'
import * as Auth from 'contexts/auth'
import get from 'lodash/get'

export default class Login extends Component {
    login = ({ isAuthenticated, login }) => {
        if (!isAuthenticated) {
            login().then(() => {
                const { location, history } = this.props

                history.replace(get(location, 'state.from', '/'))
            })
        }

        return null
    }
    render() {
        return <Auth.Consumer>{this.login}</Auth.Consumer>
    }
}
