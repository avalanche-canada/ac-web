import React, { Component } from 'react'
import { navigate } from '@reach/router'
import * as Auth from 'contexts/auth'

export default class LoginComplete extends Component {
    resume = ({ resume }) => {
        const { hash } = this.props.location

        resume(hash).then(({ state = '/' }) => {
            navigate(state)
        })

        return null
    }
    render() {
        return <Auth.Consumer>{this.resume}</Auth.Consumer>
    }
}
