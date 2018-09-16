import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Value } from 'react-powerplug'
import noop from 'lodash/noop'
import styles from './Pill.css'

PillSet.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number,
    onActivate: PropTypes.func,
}

export default function PillSet({ activeIndex, onActivate = noop, children }) {
    return (
        <ul className={styles.Set}>
            <Value initial={activeIndex}>
                {({ value, set }) =>
                    Children.map(children, (item, i) =>
                        cloneElement(item, {
                            active: value === i,
                            onClick() {
                                set(i)
                                onActivate(i)
                            },
                        })
                    )
                }
            </Value>
        </ul>
    )
}
