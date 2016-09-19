import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Table.propTypes = {
    children: PropTypes.node.isRequired,
    hoverable: PropTypes.bool,
}

function Table({children, hoverable = false}) {
    let styleName = 'Table'

    if (hoverable === true) {
        styleName += ' Hoverable'
    }

    return (
        <table styleName={styleName}>
            {children}
        </table>
    )
}

export default CSSModules(Table, styles, {allowMultiple: true})
