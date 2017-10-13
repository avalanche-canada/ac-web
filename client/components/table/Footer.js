import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Footer.propTypes = {
    children: PropTypes.node.isRequired,
}

function Footer({ children }) {
    return (
        <tfoot styleName="Footer">
            {children}
        </tfoot>
    )
}

export default CSSModules(Footer, styles)
