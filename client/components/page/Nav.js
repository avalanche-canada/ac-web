import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Nav.propTypes = {
    children: PropTypes.node.isRequired,
}

function Nav({ children }) {
    return (
        <nav styleName="Nav">
            {children}
        </nav>
    )
}

export default CSSModules(Nav, styles)
