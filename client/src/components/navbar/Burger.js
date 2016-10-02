import React, {PropTypes} from 'react'
import {compose, shouldUpdate} from 'recompose'
import CSSModules from 'react-css-modules'
import {Menu} from '../icons'
import Button, {INCOGNITO} from '../button'
import styles from './Navbar.css'

function K() {}

Burger.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function Burger({onClick = K}) {
    return (
        <div styleName='Burger--Container'>
            <Button kind={INCOGNITO} styleName='Burger' onClick={onClick}>
                <Menu width={32} height={32} />
            </Button>
        </div>
    )
}

export default compose(
    shouldUpdate(() => false),
    CSSModules(styles),
)(Burger)
