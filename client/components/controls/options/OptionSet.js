import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './OptionSet.css'

OptionSet.propTypes = {
    children: PropTypes.node.isRequired,
    // TODO: Remove that property
    show: PropTypes.bool,
    // TODO: Rename to be more explicite
    onOptionClick: PropTypes.func,
    selected: PropTypes.instanceOf(Set),
}

export default function OptionSet({
    show = false,
    selected = new Set(),
    onOptionClick,
    children,
}) {
    if (!show) {
        return null
    }

    return (
        <div className={styles.OptionSet}>
            {Children.map(children, option =>
                cloneElement(option, {
                    active: selected.has(option.props.value),
                    onClick: onOptionClick,
                })
            )}
        </div>
    )
}
