import React, { PureComponent } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
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
import menu from 'constants/menus/avcan'
import { getIsAuthenticated, getProfile } from 'getters/auth'
import { login, logout } from 'actions/auth'
import { NewRelease } from 'components/icons'
// import { ApplicationFeature } from 'prismic/containers'
import { StructuredText } from 'prismic/components/base'
import logo from 'styles/AvalancheCanada.svg'

@connect(
    createStructuredSelector({
        isAuthenticated: getIsAuthenticated,
        profile: getProfile,
    }),
    {
        login,
        logout,
    }
)
export default class AvalancheCanadaNavbar extends PureComponent {
    get logout() {
        const { name, picture } = this.props.profile || {}

        return (
            <Item title={<Avatar name={name} url={picture} size={30} />}>
                <Menu>
                    <Section>
                        <UserProfile name={name} avatar={picture} />
                        <Header>
                            <Link onClick={this.props.logout}>Logout</Link>
                        </Header>
                    </Section>
                </Menu>
            </Item>
        )
    }
    get login() {
        return <Item title="Login" onClick={this.props.login} />
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
            <Navbar logo={logo} donate="/foundation" menu={menu}>
                {this.props.isAuthenticated ? this.logout : this.login}
                {/* <ApplicationFeature>
                    {feature => this.renderFeature(feature)}
                </ApplicationFeature> */}
            </Navbar>
        )
    }
}
