import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { IsAuthenticated } from 'contexts/auth'
import * as Auth from 'contexts/auth'

export default class Protected extends Component {
    static PATHS = new Set()
    static propTypes = {
        component: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    }
    get path() {
        return this.props.location.pathname
    }
    componentDidMount() {
        Protected.PATHS.add(this.path)
    }
    componentWillUnmount() {
        Protected.PATHS.delete(this.path)
    }
    get element() {
        const { component, ...props } = this.props

        return createElement(component, props)
    }
    get login() {
        return (
            <Auth.Consumer>
                {({ login }) => {
                    login().then(() => {
                        this.navigate(this.path)
                    })
                    return null
                }}
            </Auth.Consumer>
        )
    }
    withAuth = isAuthenticated => (isAuthenticated ? this.element : this.login)
    render() {
        return <IsAuthenticated>{this.withAuth}</IsAuthenticated>
    }
}
