import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.css'

Segment.propTypes = {
    page: PropTypes.number.isRequired,
    onActivate: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node,
}

function Segment({ page, isActive, children, style, onActivate }) {
    const className = isActive ? 'Segment--Active' : 'Segment'
    function handleClick(event) {
        event.preventDefault()

        onActivate(page)
    }

    return (
        <a
            href="#"
            onClick={handleClick}
            className={styles[className]}
            style={style}>
            {children || page}
        </a>
    )
}

export default memo(Segment)

export function Disabled({ children }) {
    return <span className={styles.Disabled}>{children}</span>
}
