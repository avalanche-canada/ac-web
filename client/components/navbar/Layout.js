import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { compose, withState, withHandlers } from 'recompose'
import Navbar from './Navbar'
import Cabinet from 'components/drawer'
import { createItem } from './Factories'
import styles from './Navbar.css'
import Burger from './Burger'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Donate from './Donate'

Layout.propTypes = {
    menu: PropTypes.object.isRequired,
    logo: PropTypes.string.isRequired,
    donate: PropTypes.string.isRequired,
    isCabinetOpened: PropTypes.bool.isRequired,
    showCabinet: PropTypes.func.isRequired,
    hideCabinet: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

function Layout({
    logo,
    menu,
    donate,
    isCabinetOpened,
    showCabinet,
    hideCabinet,
    children,
}) {
    const style = {
        backgroundImage: `url("${logo}")`,
    }

    return (
        <div styleName="Layout">
            <Navbar>
                <Brand to={menu.to} title={menu.label} style={style} />
                <Burger onClick={showCabinet} />
                <ItemSet>
                    {menu.children.map(createItem)}
                    {children}
                </ItemSet>
                <Donate to={donate} />
            </Navbar>
            <Cabinet menu={menu} show={isCabinetOpened} onClose={hideCabinet} />
        </div>
    )
}

export default compose(
    withState('isCabinetOpened', 'setCabinetOpened', false),
    withHandlers({
        showCabinet: props => () => props.setCabinetOpened(true),
        hideCabinet: props => () => props.setCabinetOpened(false),
    }),
    CSSModules(styles)
)(Layout)
