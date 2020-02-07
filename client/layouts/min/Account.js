import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { useAuth } from 'contexts/auth'
import { Header, Main, Content, Headline, Aside } from 'components/page'
import Button from 'components/button'
import { Mailto } from 'components/anchors'
import * as Sidebar from 'components/sidebar'
import { Page } from 'layouts/pages'

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

    const nickname = profile?.user_metadata?.nickname || profile?.nickname
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
                            <li>
                                Change your displayed handle name in reports you
                                have submitted.
                            </li>
                        </ul>
                        <p>
                            In the meantime, do not hesitate to send us an email
                            at <Mailto /> if you need help for these.
                        </p>
                    </Headline>
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
