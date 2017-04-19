import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Blockquote.css'

Footer.propTypes = {
    children: PropTypes.node.isRequired,
}

function Footer({children}) {
    return (
        <footer styleName='Footer'>
            {children}
        </footer>
    )
}

export default CSSModules(Footer, styles)
