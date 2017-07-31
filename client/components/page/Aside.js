import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Aside.propTypes = {
    children: PropTypes.node.isRequired,
}

function Aside({ children }) {
    return (
        <aside styleName="Aside">
            {children}
        </aside>
    )
}

export default CSSModules(Aside, styles)
