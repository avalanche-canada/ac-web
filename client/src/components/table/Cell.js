import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Cell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    style: PropTypes.object,
}

function Cell({style, children, ...props}) {
    return (
        <td style={style} styleName='Cell' {...props}>
            {children}
        </td>
    )
}

export default CSSModules(Cell, styles)
