import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import ItemSet from './ItemSet'
import Brand from './Brand'
import Link from './Link'
import styles from './Navbar.css'

Navbar.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    isFoundation: PropTypes.bool,
}

const paypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=87JTBQBSCN6PS'

function Navbar({ children = [], isFoundation = false }) {
    return (
        <div styleName='Container'>
            <Brand isFoundation={isFoundation} />
            <ItemSet>
                {children}
            </ItemSet>
            <Link to={isFoundation ? paypal : 'foundation'} styleName='Donate' >
                Donate
            </Link>
        </div>
    )
}

export default CSSModules(Navbar, styles)
