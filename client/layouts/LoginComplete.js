import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AuthContext from 'contexts/auth'
import { captureException } from 'services/sentry'
import { Loading, Headline } from 'components/page'
import { Muted, Error } from 'components/text'

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
                <Headline>
                    {error ? (
                        <Fragment>
                            <Error>
                                An error happened while login you in. Please try
                                another{' '}
                                <a href="#" onClick={this.login}>
                                    login
                                </a>
                                .
                            </Error>
                            <a href="#" onClick={this.toggleMoreDetails}>
                                {showMoreDetails ? 'Less' : 'More'} details...
                            </a>
                            {showMoreDetails && (
                                <Error>{JSON.stringify(error, null, 4)}</Error>
                            )}
                        </Fragment>
                    ) : (
                        <Muted>You will be redirected once we are done!</Muted>
                    )}
                </Headline>
            </Loading>
        )
    }
}
