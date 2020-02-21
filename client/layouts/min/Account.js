import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { useAuth } from 'contexts/auth'
import { Header, Main, Content, Headline, Aside } from 'components/page'
import Button, { Submit } from 'components/button'
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

    const nickname = getNickname(profile)
    const title = isAuthenticated ? `Hi ${nickname},` : 'My account'

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Headline>
                        <p>This is eventually where you will be able to:</p>
                        <ul>
                            <li>Access the report you have submitted.</li>
                            <li>Remove or edit reports you have submitted.</li>
                        </ul>
                        <p>
                            In the meantime, do not hesitate to send us an email
                            at <Mailto /> if you need help for these.
                        </p>
                    </Headline>
                    <Button onClick={isAuthenticated ? logout : login} large>
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </Button>
                    {isAuthenticated && <Admin />}
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
    const { profile, refresh } = useAuth()

    const nickname = getNickname(profile)
    function handleSubmit(event) {
        event.preventDefault()

        const { idToken } = Accessor
        const { nickname } = event.target.elements

        changeNickname(nickname, idToken).then(() => refresh())
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Your nickname:
                <input
                    required
                    type="text"
                    name="nickname"
                    placeholder="Type the new handle name you would like"
                    defaultValue={nickname}
                />
            </label>
            <Submit>Change my handle name</Submit>
        </form>
    )
}
function getNickname(profile) {
    return profile?.user_metadata?.nickname || profile?.nickname
}
async function changeNickname(nickname, idToken) {
    const URL = 'https://api.avalanche.ca/min/username'

    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            nickname: nickname.value,
        }),
        headers: new Headers({
            Authorization: `Bearer ${idToken}`,
        }),
    })
}
