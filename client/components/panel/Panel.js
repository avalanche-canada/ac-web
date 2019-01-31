import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import Collapse from 'components/collapse'
import { Expand } from 'components/button'
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

function Panel({
    header,
    theme = SIMPLE,
    expandable = false,
    expanded = false,
    onExpandedChange = () => {},
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
        <div className={className}>
            <header
                className={styles.Header}
                onClick={expandable ? toggle : null}>
                {expandable && (
                    <Expand className={styles.Expand} expanded={on} />
                )}
                <span className={styles.Title}>{header}</span>
            </header>
            <div className={styles.Content}>
                {expandable ? (
                    <Collapse collapsed={!on}>
                        <div style={STYLE_HACK}>{children}</div>
                    </Collapse>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}

export default memo(Panel)

// Little hack to allow accurate mesuring even when chlidren have
// margins (first and last children)
// http://stackoverflow.com/questions/9770248/div-height-with-child-margin
const classNames = classnames.bind(styles)
const STYLE_HACK = {
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
}
