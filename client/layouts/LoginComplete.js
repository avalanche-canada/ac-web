import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuthContext from 'contexts/auth'
import { Loading, Headline } from 'components/page'
import { Muted, Error } from 'components/text'

export default class LoginComplete extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }
    static contextType = AuthContext
    state = {
        error: false,
    }
    login = () => {
        this.setState({ error: false })

        this.context.login(
            new Map([
                [
                    'hide',
                    () => {
                        this.navigate('/')
                    },
                ],
            ])
        )
    }
    navigate(to, timeout = 0) {
        setTimeout(() => {
            this.props.navigate(to, { replace: true })
        }, timeout)
    }
    async componentDidMount() {
        const { hash } = this.props.location

        if (hash) {
            try {
                this.setState({ error: false })

                const props = await this.context.resume(hash)

                this.navigate(props?.state || '/', 1500)
            } catch (error) {
                this.setState({ error: true })
            }
        } else {
            this.navigate('/')
        }
    }
    render() {
        const { error } = this.state

        return (
            <Loading title="Loggin in progress...">
                <Headline>
                    {error ? (
                        <Error>
                            An error happened while login you in. Please try
                            another{' '}
                            <a href="#" onClick={this.login}>
                                login
                            </a>
                            .
                        </Error>
                    ) : (
                        <Muted>You will be redirected once we are done!</Muted>
                    )}
                </Headline>
            </Loading>
        )
    }
}
