import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Table.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Table({children}) {
    return (
        <table styleName='Table'>
            {children}
        </table>
    )
}

export default CSSModules(Table, styles)
