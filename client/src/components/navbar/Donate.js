import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import Link from './Link'
import styles from './Navbar.css'

const paypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=87JTBQBSCN6PS'

Donate.propTypes = {
    isFoundation: PropTypes.bool.isRequired,
}

function Donate({ isFoundation = false }) {
    return (
        <Link to={isFoundation ? paypal : 'foundation'} styleName='Donate' >
            Donate
        </Link>
    )
}

export default CSSModules(Donate, styles)
