import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from 'contexts/auth'
import { captureException } from 'services/sentry'
import { Headline } from 'components/page'
import { Loading } from 'layouts/pages'
import { Muted, Error } from 'components/text'
import { Generic } from 'prismic/layouts'

LoginComplete.propTypes = {
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
}

export default function LoginComplete(props) {
    const [error, setError] = useState(null)
    const auth = useAuth()
    function navigate(to = '/') {
        props.navigate(to, {
            repace: true,
        })
    }
    function login() {
        setError(null)

        auth.login(
            new Map([
                [
                    'hide',
                    () => {
                        navigate()
                    },
                ],
            ])
        )
    }

    useEffect(() => {
        const { hash } = props.location

        if (hash) {
            setError(null)

            auth.resume(hash)
                .then(props => {
                    setTimeout(() => {
                        navigate(props?.state)
                    }, 1500)
                })
                .catch(error => {
                    captureException(error)
                    setError(error)
                })
        } else {
            navigate()
        }
    }, [])

    return (
        <Loading title="Authentication in progress...">
            {error ? (
                <Fragment>
                    <Headline>
                        <Error>
                            An error happened while authenticating you in. You
                            can try another{' '}
                            <a href="#" onClick={login}>
                                login
                            </a>
                            .
                        </Error>
                    </Headline>
                    <Generic uid="login-help" />
                    <details>
                        <summary>More details about the error...</summary>
                        <Error>{JSON.stringify(error, null, 4)}</Error>
                    </details>
                </Fragment>
            ) : (
                <Headline>
                    <Muted>You will be redirected once we are done!</Muted>
                </Headline>
            )}
        </Loading>
    )
}
