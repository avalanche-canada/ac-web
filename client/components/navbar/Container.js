import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {
    compose,
    withState,
    withProps,
    setPropTypes,
    withHandlers,
} from 'recompose'
import Base from './Navbar'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import Cabinet from '~/components/drawer'
import { createItem } from './Factories'
import UserProfile from './UserProfile'
import { Avatar } from '../misc'
import styles from './Navbar.css'
import noop from 'lodash/noop'

Navbar.propTypes = {
    isFoundation: PropTypes.bool,
    menu: PropTypes.object.isRequired,
    name: PropTypes.string,
    avatar: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    showLogin: PropTypes.bool.isRequired,
    showLogout: PropTypes.bool.isRequired,
    isCabinetOpened: PropTypes.bool.isRequired,
    showCabinet: PropTypes.func.isRequired,
    hideCabinet: PropTypes.func.isRequired,
    children: PropTypes.node,
}

function Navbar({
    isFoundation = false,
    menu,
    name = null,
    avatar = null,
    onLogin = noop,
    onLogout = noop,
    showCabinet,
    hideCabinet,
    isCabinetOpened,
    showLogin,
    showLogout,
    children,
}) {
    return (
        <div styleName="Container">
            <Base isFoundation={isFoundation} onBurgerClick={showCabinet}>
                {menu.children.map(createItem)}
                {children}
                {showLogin && <Item title="Login" onClick={onLogin} />}
                {showLogout &&
                    <Item title={<Avatar name={name} url={avatar} size={30} />}>
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
                    </Item>}
            </Base>
            <Cabinet
                menu={menu}
                show={isCabinetOpened}
                isFoundation={isFoundation}
                onClose={hideCabinet}
            />
        </div>
    )
}

export default compose(
    setPropTypes({
        isFoundation: PropTypes.bool,
        isAuthenticated: PropTypes.bool.isRequired,
    }),
    withState('isCabinetOpened', 'setCabinetOpened', false),
    withHandlers({
        showCabinet: props => () => props.setCabinetOpened(true),
        hideCabinet: props => () => props.setCabinetOpened(false),
    }),
    withProps(({ isFoundation, isAuthenticated }) => ({
        showLogin: !isFoundation && !isAuthenticated,
        showLogout: !isFoundation && isAuthenticated,
    })),
    CSSModules(styles)
)(Navbar)
