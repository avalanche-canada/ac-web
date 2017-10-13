import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Main.propTypes = {
    children: PropTypes.node.isRequired,
}

function Main({ children }) {
    return (
        <main styleName="Main">
            {children}
        </main>
    )
}

export default CSSModules(Main, styles)
