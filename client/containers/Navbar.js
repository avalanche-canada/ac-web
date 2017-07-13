import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose, defaultProps, withProps } from 'recompose'
import Navbar, {
    Item,
    Menu,
    Section,
    UserProfile,
    Header,
    Link,
} from '~/components/navbar'
import { Avatar } from '~/components/misc'
import * as Menus from '~/constants/menu'
import { getIsAuthenticated, getProfile } from '~/getters/auth'
import { login, logout } from '~/actions/auth'
import AvalancheCanadaLogo from '~/styles/AvalancheCanada.svg'
import AvalancheCanadaFoundationLogo
    from '~/styles/AvalancheCanadaFoundation.svg'

export const AvalancheCanada = compose(
    defaultProps({
        logo: AvalancheCanadaLogo,
        donate: '/foundation',
        menu: Menus.AvalancheCanada,
    }),
    connect(
        createStructuredSelector({
            isAuthenticated: getIsAuthenticated,
            profile: getProfile,
        }),
        {
            onLogin: login,
            onLogout: logout,
        }
    ),
    withProps(({ isAuthenticated, profile, onLogin, onLogout }) => {
        const { name, picture } = profile || {}

        return {
            children: isAuthenticated
                ? <Item title={<Avatar name={name} url={picture} size={30} />}>
                      <Menu>
                          <Section>
                              <UserProfile name={name} avatar={picture} />
                              <Header>
                                  <Link onClick={onLogout}>
                                      Logout
                                  </Link>
                              </Header>
                          </Section>
                      </Menu>
                  </Item>
                : <Item title="Login" onClick={onLogin} />,
        }
    })
)(Navbar)

export const AvalancheCanadaFoundation = defaultProps({
    logo: AvalancheCanadaFoundationLogo,
    menu: Menus.AvalancheCanadaFoundation,
    donate: '/foundation/donate',
})(Navbar)
