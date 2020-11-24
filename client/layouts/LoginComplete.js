import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
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
    const title = (
        <FormattedMessage
            description="Layout LoginComplete"
            defaultMessage="Authentication in progress..."
        />
    )
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
        <Loading title={title}>
            {error ? (
                <Fragment>
                    <Headline>
                        <Error>
                            <FormattedMessage
                                description="Layout LoginComplete"
                                defaultMessage="An error happened while authenticating you in. You can try another <link>login</link>."
                                values={{
                                    link(chunks) {
                                        return (
                                            <a href="#" onClick={login}>
                                                {chunks}
                                            </a>
                                        )
                                    },
                                }}
                            />
                        </Error>
                    </Headline>
                    <Generic uid="login-help" />
                    <details>
                        <summary>
                            <FormattedMessage
                                description="Layout LoginComplete"
                                defaultMessage="More details about this error..."
                            />
                        </summary>
                        <Error>{JSON.stringify(error, null, 4)}</Error>
                    </details>
                </Fragment>
            ) : (
                <Headline>
                    <Muted>
                        <FormattedMessage
                            description="Layout LoginComplete"
                            defaultMessage="You will be redirected once we are done!"
                        />
                    </Muted>
                </Headline>
            )}
        </Loading>
    )
}
