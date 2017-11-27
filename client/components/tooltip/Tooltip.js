import React from 'react'
import PropTypes from 'prop-types'
import styles from './Tooltip.css'

Tooltip.propTypes = {
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    arrowStyle: PropTypes.object,
}

export default function Tooltip({ placement, children, style, arrowStyle }) {
    return (
        <div className={styles[`Container--${placement}`]} style={style}>
            <div className={styles[`Arrow--${placement}`]} style={arrowStyle} />
            <div className={styles.Content}>{children}</div>
        </div>
    )
}
