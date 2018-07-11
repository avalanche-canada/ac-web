import React, { Component } from 'react'
import * as Auth from 'contexts/auth'

export default class LoginComplete extends Component {
    resume = ({ resume }) => {
        const { location, history } = this.props

        resume(location.hash).then(({ state = '/' }) => {
            history.replace(state)
        })

        return null
    }
    render() {
        return <Auth.Consumer>{this.resume}</Auth.Consumer>
    }
}
