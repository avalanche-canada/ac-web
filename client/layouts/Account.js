import React, { Fragment, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { useAuth } from 'contexts/auth'
import { Header, Main, Content, Headline, Aside } from 'components/page'
import Button, { Submit } from 'components/button'
import * as Texts from 'components/text'
import { Mailto } from 'components/anchors'
import * as Sidebar from 'components/sidebar'
import { Page } from 'layouts/pages'
import Accessor from 'services/auth/accessor'
import { HTTPError } from 'utils/fetch'

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
    const title = isAuthenticated ? `Hi ${username},` : 'My account'

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Headline>
                        <p>This is eventually where you will be able to:</p>
                        <ul>
                            <li>Access all the reports you have submitted.</li>
                            <li>Remove or edit reports you have submitted.</li>
                        </ul>
                        <p>
                            In the meantime, do not hesitate to send us an email
                            at <Mailto /> if you need help for these.
                        </p>
                    </Headline>
                    {isAuthenticated && <Admin />}
                    <br />
                    <Button onClick={isAuthenticated ? logout : login} large>
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </Button>
                </Main>
                <Aside>
                    <Sidebar.default>
                        <Sidebar.Header>Ready?</Sidebar.Header>
                        <Sidebar.Item>
                            <Link to="../submit">Create a report</Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Link to="../submissions">See all reports</Link>
                        </Sidebar.Item>
                        <Sidebar.Header>More questions?</Sidebar.Header>
                        <Sidebar.Item>
                            <Link to="../faq">
                                Mountain Information Network — FAQ
                            </Link>
                        </Sidebar.Item>
                        <Sidebar.Item>
                            <Link to="../submission-guidelines">
                                Mountain Information Network — Submission
                                Guidelines
                            </Link>
                        </Sidebar.Item>
                    </Sidebar.default>
                </Aside>
            </Content>
        </Page>
    )
}

// Utils
function Admin() {
    const { status, data, change } = useUsername()
    const { profile } = useAuth()
    const username = getUsername(profile)
    const [tempUsername, setTempUsername] = useState(username)
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
            <fieldset disabled={status === 'pending'}>
                <legend>Change your username</legend>
                <label>
                    Your username
                    <br />
                    <Texts.Muted as="small">
                        Changing your username will change all previously
                        submitted reports as well as all reports you will submit
                        in the future.
                    </Texts.Muted>
                    <input
                        type="text"
                        name="username"
                        required
                        minLength="4"
                        maxLength="50"
                        placeholder="Type the new username you would like..."
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
                    Change my username
                </Submit>
            </fieldset>
        </form>
    )
}
function Message({ status, code, children }) {
    switch (status) {
        case 'resolved':
            return <Texts.Muted>{children}</Texts.Muted>
        case 'rejected':
            return (
                <Texts.Error>
                    {children}
                    {code === 'USERNAME_TAKEN' && (
                        <Fragment>
                            . This could happen for few reasons, do not hesitate
                            to contact us at <Mailto /> so we can help you to
                            sort it out.
                        </Fragment>
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
    const [state, dispatch] = useReducer(reducer, {
        status: 'idle',
        error: null,
        data: null,
        async change(username) {
            let payload
            try {
                dispatch({ type: 'started' })
                payload = await changeUsername(profile.user_id, username)
                refresh()
                dispatch({ type: 'success', payload })
            } catch ([error, payload]) {
                dispatch({ type: 'error', error, payload })
            }
        },
    })

    return state
}
async function changeUsername(userid, username) {
    const URL = 'https://api.avalanche.ca/users/' + encodeURIComponent(userid)
    const response = await fetch(URL, {
        method: 'PATCH',
        body: JSON.stringify({ username }),
        headers: new Headers({
            Authorization: `Bearer ${Accessor.idToken}`,
            'Accept-Language': navigator.language,
        }),
    })
    const payload = await response.json()

    if (response.ok) {
        return payload
    }

    throw [new HTTPError(response), payload]
}
function reducer(state, { type, payload, error }) {
    switch (type) {
        case 'started':
            return {
                ...state,
                status: 'pending',
            }
        case 'success':
            return {
                ...state,
                data: payload,
                status: 'resolved',
            }
        case 'error':
            return {
                ...state,
                status: 'rejected',
                error,
                data: payload,
            }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}
