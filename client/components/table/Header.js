import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

function Header({ children }) {
    return (
        <thead styleName="Header">
            {children}
        </thead>
    )
}

export default CSSModules(Header, styles)
