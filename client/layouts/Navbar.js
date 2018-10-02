import React, { Component } from 'react'
import { navigate, Location } from '@reach/router'
import { Protected } from 'router'
import * as Auth from 'contexts/auth'
import Navbar, {
    Item,
    Menu,
    Section,
    UserProfile,
    Header,
    Link,
} from 'components/navbar'
import Avatar from 'components/avatar'
import Compose from 'components/Compose'
import menu from 'constants/menus/avcan'
import logo from 'styles/AvalancheCanada.svg'

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
