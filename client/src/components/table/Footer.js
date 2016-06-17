import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Footer.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Footer({children}) {
    return (
        <tfoot styleName='Footer'>
            {children}
        </tfoot>
    )
}

export default CSSModules(Footer, styles)
