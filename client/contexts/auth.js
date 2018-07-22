import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import Service from 'services/auth/auth0'
import Accessor from 'services/auth/accessor'
import * as Raven from 'services/raven'

const AuthContext = createContext()

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }
    service = Service.create()
    constructor(props) {
        super(props)

        const { isAuthenticated, profile } = Accessor.create()

        this.state = {
            isAuthenticated,
            profile,
        }
    }
    get value() {
        return {
            ...this.state,
            login: this.login,
            resume: this.resume,
            logout: this.logout,
        }
    }
    login = async () => {
        const { profile } = await this.service.login()

        this.setState({
            isAuthenticated: true,
            profile,
        })
    }
    resume = async hash => {
        const data = await this.service.resume(hash)

        this.setState({
            isAuthenticated: true,
            profile: data.profile,
        })

        return data
    }
    logout = async () => {
        await this.service.logout()

        return new Promise(fullfil => {
            fullfil()

            // FIXME: So ugly that setTimeout, but required to redirect (leaving protected route) before updating the state.
            setTimeout(() => {
                this.setState({
                    isAuthenticated: false,
                    profile: null,
                })
            })
        })
    }
    setUserContext() {
        const { profile } = this.state

        if (profile) {
            Raven.setUserContext(profile)
        }
    }
    componentDidMount() {
        this.setUserContext()
    }
    componentDidUpdate() {
        this.setUserContext()
    }
    render() {
        return (
            <AuthContext.Provider value={this.value}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export const { Consumer } = AuthContext
