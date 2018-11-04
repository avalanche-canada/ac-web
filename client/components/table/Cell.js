import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

Cell.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
    colSpan: PropTypes.number,
}

function Cell({ style, children, colSpan }) {
    return (
        <td className={styles.Cell} style={style} colSpan={colSpan}>
            {children}
        </td>
    )
}

export default memo(Cell)
