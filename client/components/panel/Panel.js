import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import noop from 'lodash/noop'
import { Expand } from 'components/button'
import Collapsible from 'components/collapsible'
import styles from './Panel.css'

export const SIMPLE = 'Simple'
export const INVERSE = 'Inverse'

Panel.propTypes = {
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    onExpandedChange: PropTypes.func,
    header: PropTypes.node.isRequired,
    theme: PropTypes.oneOf([INVERSE, SIMPLE]),
    children: PropTypes.string.isRequired,
}

export default function Panel({
    header,
    theme = SIMPLE,
    expandable = false,
    expanded = false,
    onExpandedChange = noop,
    children,
}) {
    const [on, set] = useState(expanded)
    const className = classNames({
        [`Container--${theme}--Expandable`]: expandable,
        [`Container--${theme}`]: !expandable,
    })
    function toggle() {
        set(!on)
        onExpandedChange(!on)
    }

    return (
        <section className={className}>
            <header
                className={styles.Header}
                onClick={expandable ? toggle : null}>
                {expandable && (
                    <Expand className={styles.Expand} expanded={on} />
                )}
                <span className={styles.Title}>{header}</span>
            </header>
            <Collapsible expanded={on}>{children}</Collapsible>
        </section>
    )
}

const classNames = classnames.bind(styles)
