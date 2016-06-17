import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {compose, withState, withProps, setDisplayName} from 'recompose'
import {AC, ACF} from 'constants/menu'
import Navbar from './Navbar'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import {Container as Cabinet} from '../drawer'
import {createItem} from './Factories'
import UserProfile from './UserProfile'
import {Avatar} from '../misc'
import styles from './Navbar.css'

function K() {}

Container.propTypes = {
    isFoundation: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
}

function Container({
    isFoundation = false,
    isAuthenticated = false,
    menu,
    name = null,
    avatar = null,
    onLogin = K,
    onLogout = K,
    setShowCabinet,
    showCabinet,
    showLogin,
    showLogout,
}) {
    return (
        <div styleName='Container'>
            <Navbar isFoundation={isFoundation} onBurgerClick={event => setShowCabinet(true)} >
                {menu.children.map(createItem)}
                {showLogin && <Item title='Login' onClick={onLogin} />}
                {showLogout &&
                    <Item title={<Avatar name={name} url={avatar} />}>
                        <Menu>
                            <Section>
                                <UserProfile name={name} avatar={avatar} />
                                <Header>
                                    <Link onClick={onLogout}>
                                        Logout
                                    </Link>
                                </Header>
                            </Section>
                        </Menu>
                    </Item>
                }
            </Navbar>
            <Cabinet menu={menu} show={showCabinet} isFoundation={isFoundation} onClose={() => setShowCabinet(false)} />
        </div>
    )
}


export default compose(
    setDisplayName('Container'),
    withState('showCabinet', 'setShowCabinet', false),
    withProps(({isFoundation, isAuthenticated}) => ({
        showLogin: !isFoundation && !isAuthenticated,
        showLogout: !isFoundation && isAuthenticated,
        menu: isFoundation ? ACF : AC,
    })),
)(CSSModules(Container, styles))
