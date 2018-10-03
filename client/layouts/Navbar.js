import React, { Component, Fragment } from 'react'
import { navigate, Location } from '@reach/router'
import * as Auth from 'contexts/auth'
import { DocumentByUID } from 'prismic/containers'
import { Loading } from 'components/text'
import { STATIC_PAGE } from 'constants/prismic'
import { Protected } from 'router'
import Navbar, {
    Item,
    Menu,
    Section,
    UserProfile,
    Header,
    Link,
    ColumnSet,
} from 'components/navbar'
import Avatar from 'components/avatar'
import Compose from 'components/Compose'
import menu from /* preval */ '../constants/menus/avcan'
import logo from 'styles/AvalancheCanada.svg'

// Utils
class Ambassadors extends Component {
    renderLink({ fullName }) {
        var { to } = this.props
        var hash = fullName.toLowerCase().replace(/\s/, '-', 'g')

        return (
            <Link key={hash} to={`${to}#${hash}`}>
                {fullName}
            </Link>
        )
    }
    renderContent = ({ loading, document }) => (
        <Fragment>
            <Loading show={loading} />
            {document && (
                <ColumnSet>
                    {document.data.content[0].value.map(this.renderLink, this)}
                </ColumnSet>
            )}
        </Fragment>
    )
    render() {
        return (
            <DocumentByUID type={STATIC_PAGE} uid="ambassadors">
                {this.renderContent}
            </DocumentByUID>
        )
    }
}

menu.children[4].children[2].children = Ambassadors

export default class AvalancheCanadaNavbar extends Component {
    handleLoginClick = event => {
        event.preventDefault()

        this.login()
    }
    handleLogoutClick = event => {
        event.preventDefault()

        this.logout().then(() => {
            if (Protected.PATHS.has(this.location.pathname)) {
                navigate('/')
            }
        })
    }
    renderNavbar = ([
        { isAuthenticated, login, logout, profile = {} },
        { location },
    ]) => {
        this.login = login
        this.logout = logout
        this.location = location

        return (
            <Navbar logo={logo} donate="/foundation" menu={menu}>
                {isAuthenticated ? (
                    <Item
                        title={
                            <Avatar
                                name={profile.name}
                                url={profile.picture}
                                size={30}
                            />
                        }>
                        <Menu>
                            <Section>
                                <UserProfile
                                    name={profile.name}
                                    avatar={profile.picture}
                                />
                                <Header>
                                    <Link onClick={this.handleLogoutClick}>
                                        Logout
                                    </Link>
                                </Header>
                            </Section>
                        </Menu>
                    </Item>
                ) : (
                    <Item title="Login" onClick={this.handleLoginClick} />
                )}
            </Navbar>
        )
    }
    render() {
        return (
            <Compose components={[<Auth.Consumer />, <Location />]}>
                {this.renderNavbar}
            </Compose>
        )
    }
}
