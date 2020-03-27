import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { useToggle } from 'hooks'
import { Expand } from 'components/button'
import css from './Layer.css'

Layer.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element,
}

export default function Layer({
    title,
    visible,
    disabled,
    icon,
    onClick,
    children,
}) {
    const [expanded, toggle] = useToggle(false)
    const className = classnames({
        [css.Layer]: true,
        [css.Visible]: visible,
        [css.Disabled]: disabled,
    })
    function handleExpandClick(event) {
        event.stopPropagation()

        toggle()
    }

    return (
        <div className={className}>
            <div className={css.Header} onClick={disabled ? noop : onClick}>
                {icon}
                <span className={css.Title}>{title}</span>
                {Boolean(children && !disabled) && (
                    <Expand
                        chevron
                        expanded={expanded}
                        onClick={handleExpandClick}
                    />
                )}
            </div>
            {Boolean(expanded && !disabled) && children}
        </div>
    )
}
