import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
}

function Sidebar({ children }) {
    return (
        <nav styleName="Sidebar">
            {children}
        </nav>
    )
}

export default CSSModules(Sidebar, styles)
