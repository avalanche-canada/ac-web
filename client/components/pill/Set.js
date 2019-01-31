import React, { Children, cloneElement, useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import styles from './Pill.css'

PillSet.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number,
    onActivate: PropTypes.func,
}

export default function PillSet({ activeIndex, onActivate = noop, children }) {
    const [value, set] = useState(activeIndex)

    return (
        <ul className={styles.Set}>
            {Children.map(children, (item, index) =>
                cloneElement(item, {
                    active: value === index,
                    onClick() {
                        set(index)
                        onActivate(index)
                    },
                })
            )}
        </ul>
    )
}
