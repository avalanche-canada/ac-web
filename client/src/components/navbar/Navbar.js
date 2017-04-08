import React from 'react'
import PropTypes from 'prop-types'
import {compose, onlyUpdateForKeys, shouldUpdate} from 'recompose'
import CSSModules from 'react-css-modules'
import {onlyUpdateForKey} from 'compose'
import Burger from './Burger'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Donate from './Donate'
import styles from './Navbar.css'
import noop from 'lodash/noop'

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    isFoundation: PropTypes.bool,
    onBurgerClick: PropTypes.func.isRequired,
}

function Navbar({isFoundation = false, onBurgerClick = noop, children = []}) {
    return (
        <div styleName='Navbar'>
            <nav styleName='Navigation'>
                <Brand isFoundation={isFoundation} />
                <Burger onClick={onBurgerClick} />
                <ItemSet>
                    {children}
                </ItemSet>
                <Donate isFoundation={isFoundation} />
            </nav>
        </div>
    )
}

export default compose(
    onlyUpdateForKey('children'),
    CSSModules(styles),
)(Navbar)
