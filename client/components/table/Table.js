import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
    hoverable: PropTypes.bool,
    condensed: PropTypes.bool,
}

function Table({ children, hoverable, condensed }) {
    let styleName = condensed ? 'Table--Condensed' : 'Table'

    if (hoverable === true) {
        styleName += ' Hoverable'
    }

    return (
        <table styleName={styleName}>
            {children}
        </table>
    )
}

export default CSSModules(Table, styles, { allowMultiple: true })
