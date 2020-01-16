import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useToggle } from 'hooks'
import { Expand } from 'components/button'
import css from './Layer.css'

Layer.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element,
}

export default function Layer({ title, visible, icon, onClick, children }) {
    const [expanded, toggle] = useToggle(false)
    const className = classnames({
        [css.Layer]: !visible,
        [css['Layer--Visible']]: visible,
    })
    function handleExpandClick(event) {
        event.stopPropagation()

        toggle()
    }

    return (
        <div className={className}>
            <div className={css.Header} onClick={onClick}>
                {icon}
                <span className={css.Title}>{title}</span>
                {children && (
                    <Expand
                        chevron
                        expanded={expanded}
                        onClick={handleExpandClick}
                    />
                )}
            </div>
            {expanded && children}
        </div>
    )
}
