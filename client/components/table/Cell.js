import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

Cell.propTypes = {
    children: PropTypes.node.isRequired,
}

function Cell({ children, ...props }) {
    return (
        <td {...props} className={styles.Cell}>
            {children}
        </td>
    )
}

export default memo(Cell)
