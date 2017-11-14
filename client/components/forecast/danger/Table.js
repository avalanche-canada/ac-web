import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'
import * as Modes from 'constants/forecast/mode'

const UNHANDLED = new Set([
    Modes.SUMMER,
    Modes.SPRING,
    Modes.OFF,
    Modes.EARLY_SEASON,
])

Table.propTypes = {
    mode: PropTypes.oneOf(Array.from(Modes)).isRequired,
    children: PropTypes.node.isRequired,
}

function Table({ children, mode }) {
    if (UNHANDLED.has(mode)) {
        return null
    }

    return (
        <div styleName="Table">
            {children}
        </div>
    )
}

export default CSSModules(Table, styles)
