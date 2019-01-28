import React, { Children, createElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Danger.css'
import { FirstDay } from './Day'

DaySet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function DaySet({ children }) {
    return (
        <div className={styles.DaySet}>
            {Children.map(children, (day, index) =>
                index ? day : createElement(FirstDay, day.props)
            )}
        </div>
    )
}
