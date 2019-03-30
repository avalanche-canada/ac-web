import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import Collapse from 'components/collapse'
import { Expand } from 'components/button'
import styles from './Layer.css'
import { useToggle } from 'utils/react/hooks'

Layer.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element,
}

export default function Layer({ title, visible, icon, onClick, children }) {
    const [expanded, toggle] = useToggle(false)
    const className = classNames({
        Layer: !visible,
        'Layer--Visible': visible,
    })
    function handleExpandClick(event) {
        event.stopPropagation()

        toggle()
    }

    return (
        <div className={className}>
            <div className={styles.Header} onClick={onClick}>
                {icon}
                <span className={styles.Title}>{title}</span>
                {children && (
                    <Expand
                        chevron
                        expanded={expanded}
                        onClick={handleExpandClick}
                    />
                )}
            </div>
            {children && (
                <Collapse collapsed={!expanded}>
                    <div style={STYLE_HACK}>{children}</div>
                </Collapse>
            )}
        </div>
    )
}

const classNames = classnames.bind(styles)

// Little hack to allow accurate mesuring even when chlidren have
// margins (first and last children)
// http://stackoverflow.com/questions/9770248/div-height-with-child-margin
const STYLE_HACK = {
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
}
