import React from 'react'
import PropTypes from 'prop-types'
import styles from './Callout.css'

// FIXME: values should be uppercase, but it does not work > look at DayPicker in MWF after!
export const TOP = 'top'
export const BOTTOM = 'bottom'
export const LEFT = 'left'
export const RIGHT = 'right'

const classNames = new Map([
    [TOP, styles.Top],
    [BOTTOM, styles.Bottom],
    [LEFT, styles.Left],
    [RIGHT, styles.Right],
])

Callout.propTypes = {
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf([TOP, BOTTOM, LEFT, RIGHT]),
    style: PropTypes.object,
}

export default function Callout({ children, placement = BOTTOM, style }) {
    return (
        <div className={classNames.get(placement)} style={style}>
            <div className={styles.Inner}>{children}</div>
        </div>
    )
}
