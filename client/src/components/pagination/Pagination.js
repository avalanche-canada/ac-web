import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Pagination.css'

Pagination.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}

function Pagination({ children }) {
    return (
        <div styleName='Container'>
            {children}
        </div>
    )
}

export default CSSModules(Pagination, styles)
