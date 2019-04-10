import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useToggle } from 'utils/react/hooks'
import Collapsible from 'components/collapsible'
import { Expand } from 'components/button'
import styles from './Layer.css'

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
            <Collapsible expanded={expanded}>{children}</Collapsible>
        </div>
    )
}

const classNames = classnames.bind(styles)
