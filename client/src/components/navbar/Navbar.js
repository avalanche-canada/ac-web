import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Burger from './Burger'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Donate from './Donate'
import styles from './Navbar.css'

function K() {}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    isFoundation: PropTypes.bool,
    onBurgerClick: PropTypes.func.isRequired,
}

function Navbar({isFoundation = false, onBurgerClick = K, children = []}) {
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

export default CSSModules(Navbar, styles)
