import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AuthContext from 'contexts/auth'
import { captureException } from 'services/sentry'
import { Loading, Headline } from 'components/page'
import { Muted, Error } from 'components/text'
import { Generic } from 'prismic/layouts'

// TODO Rework w/ <Suspense> & HOOKS

export default class LoginComplete extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }
    static contextType = AuthContext
    state = {
        error: true,
        showMoreDetails: false,
    }
    toggleMoreDetails = () => {
        this.setState(({ showMoreDetails }) => ({
            showMoreDetails: !showMoreDetails,
        }))
    }
    login = () => {
        this.setState({ error: null })

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
            this.props.navigate(to, {
                replace: true,
            })
        }, timeout)
    }
    async componentDidMount() {
        const { hash } = this.props.location

        if (hash) {
            try {
                this.setState({ error: null })

                const props = await this.context.resume(hash)

                this.navigate(props?.state || '/', 1500)
            } catch (error) {
                captureException(error)
                this.setState({ error })
            }
        } else {
            this.navigate('/')
        }
    }
    render() {
        const { error, showMoreDetails } = this.state

        return (
            <Loading title="Loggin in progress...">
                {error ? (
                    <Fragment>
                        <Headline>
                            <Error>
                                An error happened while login you in. You can
                                try another{' '}
                                <a href="#" onClick={this.login}>
                                    login
                                </a>
                                .
                            </Error>
                        </Headline>
                        <Generic uid="login-help" />
                        <a href="#" onClick={this.toggleMoreDetails}>
                            {showMoreDetails ? 'Less' : 'More'} details about
                            the error...
                        </a>
                        {showMoreDetails && (
                            <Error>{JSON.stringify(error, null, 4)}</Error>
                        )}
                    </Fragment>
                ) : (
                    <Headline>
                        <Muted>You will be redirected once we are done!</Muted>
                    </Headline>
                )}
            </Loading>
        )
    }
}
