import React, { PureComponent } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Navbar, {
    Item,
    Menu,
    Section,
    UserProfile,
    Header,
    Link,
    Feature,
} from 'components/navbar'
import Avatar from 'components/avatar'
import * as Menus from 'constants/menu'
import { getIsAuthenticated, getProfile } from 'getters/auth'
import { login, logout } from 'actions/auth'
import { NewRelease } from 'components/icons'
import AvalancheCanadaLogo from 'styles/AvalancheCanada.svg'
import AvalancheCanadaFoundationLogo from 'styles/AvalancheCanadaFoundation.svg'
import { ApplicationFeature } from 'prismic/containers'
import { StructuredText } from 'prismic/components/base'

@withRouter
@connect(
    createStructuredSelector({
        isAuthenticated: getIsAuthenticated,
        profile: getProfile,
    }),
    {
        onLoginClick: login,
        logout,
    }
)
export class AvalancheCanada extends PureComponent {
    handleLogoutClick = () => {
        this.props.logout()
        this.props.history.push('/')
    }
    get logout() {
        const { name, picture } = this.props.profile || {}

        return (
            <Item title={<Avatar name={name} url={picture} size={30} />}>
                <Menu>
                    <Section>
                        <UserProfile name={name} avatar={picture} />
                        <Header>
                            <Link onClick={this.handleLogoutClick}>Logout</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
        )
    }
    get login() {
        return <Item title="Login" onClick={this.props.onLoginClick} />
    }
    renderFeature({ data, firstPublicationDate }) {
        return (
            <Item title={<NewRelease />}>
                <Menu>
                    <Section>
                        <Feature
                            name={data.name}
                            headline={data.headline}
                            date={firstPublicationDate}>
                            <StructuredText value={data.content} />
                        </Feature>
                    </Section>
                </Menu>
            </Item>
        )
    }
    render() {
        return (
            <ApplicationFeature>
                {feature => (
                    <Navbar
                        logo={AvalancheCanadaLogo}
                        donate="/foundation"
                        menu={Menus.AvalancheCanada}>
                        {this.props.isAuthenticated ? this.logout : this.login}
                        {/* {feature ? this.renderFeature(feature) : null} */}
                    </Navbar>
                )}
            </ApplicationFeature>
        )
    }
}

export function AvalancheCanadaFoundation() {
    return (
        <Navbar
            logo={AvalancheCanadaFoundationLogo}
            menu={Menus.AvalancheCanadaFoundation}
            donate="/foundation/donate"
        />
    )
}
