import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAuth } from 'contexts/auth'
import { Header, Main, Content, Headline, Aside } from 'components/page'
import Button, { Submit } from 'components/button'
import * as Texts from 'components/text'
import { Mailto } from 'components/anchors'
import * as Sidebar from 'components/sidebar'
import { Page } from 'layouts/pages'
import Accessor from 'services/auth/accessor'
import { useLocaleCode } from 'contexts/intl'
import { changeUsername } from 'requests/admin'

Account.propTypes = {
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
}

export default function Account() {
    const { isAuthenticated, profile, ...actions } = useAuth(true)
    function logout() {
        actions.logout()
    }
    function login() {
        actions.login()
    }

    const username = getUsername(profile)
    const title = isAuthenticated ? (
        <FormattedMessage
            description="Layout Account"
            defaultMessage="Hi {username},"
            values={{ username }}
        />
    ) : (
        <FormattedMessage id="my-account" defaultMessage="My account" />
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Headline>
                        <p>
                            <FormattedMessage
                                description="Layout Account"
                                defaultMessage="This is eventually where you will be able to:"
                            />
                        </p>
                        <ul>
                            <li>
                                <FormattedMessage
                                    description="Layout Account"
                                    defaultMessage="Access all the reports you have submitted."
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    description="Layout Account"
                                    defaultMessage="Remove or edit reports you have submitted."
                                />
                            </li>
                        </ul>
                        <p>
                            <FormattedMessage
                                description="Layout Account"
                                defaultMessage="In the meantime, do not hesitate to email us at <mailto></mailto> if you need help for these."
                                values={{
                                    mailto() {
                                        return <Mailto />
                                    },
                                }}
                            />
                        </p>
                    </Headline>
                    {isAuthenticated && <Admin />}
                    <br />
                    <Button onClick={isAuthenticated ? logout : login} large>
                        {isAuthenticated ? (
                            <FormattedMessage
                                id="logout"
                                defaultMessage="Logout"
                            />
                        ) : (
                            <FormattedMessage
                                id="login"
                                defaultMessage="Login"
                            />
                        )}
                    </Button>
                </Main>
                <Aside>
                    <Sidebar.default>
                        <Sidebar.Header>
                            <FormattedMessage
                                description="Layout Account"
                                defaultMessage="Ready?"
                            />
                        </Sidebar.Header>
                        <Sidebar.Item>
                            <Link to="/mountain-information-network/submit">
                                <FormattedMessage
                                    description="Layout Account"
                                    defaultMessage="Create a report"
                                />
                            </Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Link to="/mountain-information-network/submissions">
                                <FormattedMessage
                                    description="Layout Account"
                                    defaultMessage="See all reports"
                                />
                            </Link>
                        </Sidebar.Item>
                        <Sidebar.Header>
                            <FormattedMessage
                                description="Layout Account"
                                defaultMessage="More questions?"
                            />
                        </Sidebar.Header>
                        <Sidebar.Item>
                            <Link to="/mountain-information-network/faq">
                                <FormattedMessage
                                    description="Layout Account"
                                    defaultMessage="Mountain Information Network — FAQ"
                                />
                            </Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Link to="/mountain-information-network/submission-guidelines">
                                <FormattedMessage
                                    description="Layout Account"
                                    defaultMessage="Mountain Information Network — Submission Guidelines"
                                />
                            </Link>
                        </Sidebar.Item>
                    </Sidebar.default>
                </Aside>
            </Content>
        </Page>
    )
}

// Utils and constants
function Admin() {
    const intl = useIntl()
    const { status, data, change } = useUsername()
    const { profile } = useAuth()
    const username = getUsername(profile)
    const [tempUsername, setTempUsername] = useState(username)
    const placeholder = intl.formatMessage({
        description: 'Layout Account',
        defaultMessage: 'Type the new username you would like...',
    })
    function handleChange({ target }) {
        setTempUsername(target.value)
    }
    function handleSubmit(event) {
        event.preventDefault()

        const { username } = event.target.elements

        change(username.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={status === PENDING}>
                <legend>
                    <FormattedMessage
                        description="Layout Account"
                        defaultMessage="Change your username"
                    />
                </legend>
                <label>
                    <FormattedMessage
                        description="Layout Account"
                        defaultMessage="Your username"
                    />
                    <br />
                    <Texts.Muted as="small">
                        <FormattedMessage
                            description="Layout Account"
                            defaultMessage="Changing your username will change all previously submitted reports as well as all reports you will submit in the future."
                        />
                    </Texts.Muted>
                    <input
                        type="text"
                        name="username"
                        required
                        minLength="4"
                        maxLength="50"
                        placeholder={placeholder}
                        defaultValue={username}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                    />
                </label>
                <Message status={status} code={data?.messageCode}>
                    {data?.message}
                </Message>
                <Submit disabled={tempUsername === username}>
                    <FormattedMessage
                        description="Layout Account"
                        defaultMessage="Change my username"
                    />
                </Submit>
            </fieldset>
        </form>
    )
}
function Message({ status, code, children }) {
    switch (status) {
        case RESOLVED:
            return <Texts.Muted>{children}</Texts.Muted>
        case REJECTED:
            return (
                <Texts.Error as="div">
                    <p>{children}</p>
                    {code === 'USERNAME_TAKEN' && (
                        <p>
                            <FormattedMessage
                                description="Layout Account"
                                defaultMessage="This could happen for few reasons. Do not hesitate to contact us at <mail></mail> so we can help you sort that out."
                                values={{
                                    mail() {
                                        return <Mailto />
                                    },
                                }}
                            />
                        </p>
                    )}
                </Texts.Error>
            )
        default:
            return null
    }
}
function getUsername(profile) {
    return profile?.user_metadata?.nickname || profile?.nickname
}
function useUsername() {
    const { refresh, profile } = useAuth()
    const locale = useLocaleCode()
    const [state, dispatch] = useReducer(reducer, {
        status: 'idle',
        error: null,
        data: null,
        async change(username) {
            try {
                dispatch({ type: 'started' })

                const payload = await changeUsername(
                    Accessor.idToken,
                    profile.user_id,
                    username,
                    locale
                )

                refresh()
                dispatch({ type: 'success', payload })
            } catch (error) {
                dispatch({ type: 'error', error })
            }
        },
    })

    return state
}
function reducer(state, { type, payload, error }) {
    switch (type) {
        case 'started':
            return {
                ...state,
                status: PENDING,
            }
        case 'success':
            return {
                ...state,
                data: payload,
                status: RESOLVED,
            }
        case 'error':
            return {
                ...state,
                status: REJECTED,
                error,
                data: error.payload,
            }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
