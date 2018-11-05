import React, { Component, Fragment } from 'react'
import { Location } from '@reach/router'
import AuthContext from 'contexts/auth'
import { Document } from 'prismic/containers'
import * as params from 'prismic/params'
import { Loading } from 'components/text'
import { STATIC_PAGE } from 'constants/prismic'
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
            <Document {...params.uid(STATIC_PAGE, 'ambassadors')}>
                {this.renderContent}
            </Document>
        )
    }
}

menu.children[4].children[1].children = Ambassadors

export default class AvalancheCanadaNavbar extends Component {
    static contextType = AuthContext
    handleLoginClick = event => {
        event.preventDefault()

        this.context.login()
    }
    handleLogoutClick = event => {
        event.preventDefault()

        this.context.logout()
    }
    render() {
        const { isAuthenticated } = this.context
        const { name, picture } = this.context.profile || {}

        return (
            <Navbar logo={logo} donate="/foundation" menu={menu}>
                {isAuthenticated ? (
                    <Item
                        title={<Avatar name={name} url={picture} size={30} />}>
                        <Menu>
                            <Section>
                                <UserProfile name={name} avatar={picture} />
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
}
