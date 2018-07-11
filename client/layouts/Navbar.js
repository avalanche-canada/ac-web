import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from 'router/common'
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
import menu from 'constants/menus/avcan'
import logo from 'styles/AvalancheCanada.svg'

export default class AvalancheCanadaNavbar extends Component {
    renderLogout = logout => {
        return (
            <Route>
                {({ history, location }) => {
                    function handleClick() {
                        logout().then(() => {
                            if (ProtectedRoute.PATHS.has(location.pathname)) {
                                history.push('/')
                            }
                        })
                    }

                    return <Link onClick={handleClick}>Logout</Link>
                }}
            </Route>
        )
    }
    renderNavbar = ({ isAuthenticated, login, logout, profile = {} }) => {
        return (
            <Navbar logo={logo} donate="/foundation" menu={menu}>
                {isAuthenticated ? (
                    <Item
                        onClick={logout}
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
                                <Header>{this.renderLogout(logout)}</Header>
                            </Section>
                        </Menu>
                    </Item>
                ) : (
                    <Item title="Login" onClick={login} />
                )}
            </Navbar>
        )
    }
    render() {
        return <Auth.Consumer>{this.renderNavbar}</Auth.Consumer>
    }
}
