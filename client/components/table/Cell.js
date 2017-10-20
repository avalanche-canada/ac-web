import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { onlyUpdateForKey } from 'compose'
import styles from './Table.css'

Cell.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

function Cell({ style, children }) {
    return (
        <td styleName="Cell" style={style}>
            {children}
        </td>
    )
}

export default onlyUpdateForKey('children')(CSSModules(Cell, styles))
