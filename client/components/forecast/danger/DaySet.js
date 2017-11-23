import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Danger.css'

function cloneDay(day, index) {
    return cloneElement(day, {
        first: index === 0,
    })
}

DaySet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function DaySet({ children }) {
    return (
        <div className={styles.DaySet}>{Children.map(children, cloneDay)}</div>
    )
}
