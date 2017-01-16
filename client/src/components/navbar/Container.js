import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {compose, withState, withProps, setDisplayName} from 'recompose'
import Navbar from './Navbar'
import Item from './Item'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import Cabinet from 'components/drawer'
import {createItem} from './Factories'
import UserProfile from './UserProfile'
import {Avatar} from '../misc'
import styles from './Navbar.css'
import noop from 'lodash/noop'
import snowflake from 'components/icons/snowflake.svg'
import {FeatureSet} from 'components/gallery'

Container.propTypes = {
    isFoundation: PropTypes.bool,
    profile: PropTypes.object,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
}

function Container({
    isFoundation = false,
    isAuthenticated = false,
    menu,
    profile = {},
    onLogin = noop,
    onLogout = noop,
    setShowCabinet,
    showCabinet,
    showLogin,
    showLogout,
    features = [],
}) {
    const {name, picture} = profile

    return (
        <div styleName='Container'>
            <Navbar isFoundation={isFoundation} onBurgerClick={event => setShowCabinet(true)} >
                {menu.children.map(createItem)}
                {showLogin && <Item title='Login' onClick={onLogin} />}
                {showLogout &&
                    <Item title={<Avatar name={name} url={picture} size={30} />}>
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
                }
                {features.isEmpty() ||
                    <Item title={<img src={snowflake} />}>
                        <Menu>
                            <FeatureSet features={features} />
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
    })),
    CSSModules(styles),
)(Container)
