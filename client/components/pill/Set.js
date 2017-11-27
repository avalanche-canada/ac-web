import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Index } from 'react-powerplug'
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
            <Index initial={activeIndex}>
                {({ index, setIndex }) =>
                    Children.map(children, (item, i) =>
                        cloneElement(item, {
                            active: index === i,
                            onClick() {
                                setIndex(i)
                                onActivate(i)
                            },
                        })
                    )
                }
            </Index>
        </ul>
    )
}
