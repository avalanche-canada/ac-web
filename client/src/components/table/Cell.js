import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

Cell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    span: PropTypes.number,
    style: PropTypes.object,
}

function Cell({span, style, children}) {
    return (
        <td style={style} styleName='Cell' colSpan={span}>
            {children}
        </td>
    )
}

export default CSSModules(Cell, styles)
