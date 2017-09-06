import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Pill.css'
import { getStringFromChildren } from '~/utils/react'
import noop from 'lodash/noop'

Item.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

function Item({ active = false, onClick = noop, children }) {
    return (
        <li
            styleName={active ? 'Item--Active' : 'Item'}
            onClick={onClick}
            title={getStringFromChildren({ children })}>
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
