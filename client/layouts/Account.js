import React, { useReducer, useState } from 'react'
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
    const { status, error, data, change } = useUsername()
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
                <legend>Username</legend>
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
                        placeholder="Type the new username you would like..."
                        defaultValue={username}
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                    />
                </label>
                {status === 'resolved' && (
                    <Texts.Muted>{data.message}</Texts.Muted>
                )}
                {status === 'rejected' && (
                    <Texts.Error>{error.message}</Texts.Error>
                )}
                <Submit disabled={tempUsername === username}>
                    Change my username
                </Submit>
            </fieldset>
        </form>
    )
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
            try {
                dispatch(['started'])
                const payload = await changeUsername(profile.user_id, username)
                refresh()
                dispatch(['success', payload])
            } catch (error) {
                dispatch(['error', error])
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

    throw new Error(payload.message)
}
function reducer(state, [type, payload]) {
    switch (type) {
        case 'started':
            return {
                ...state,
                status: 'pending',
            }
        case 'success':
            return {
                ...state,
                status: 'resolved',
            }
        case 'error':
            return {
                ...state,
                status: 'rejected',
                error: payload,
            }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}
