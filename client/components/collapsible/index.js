import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Collapsible.css'

Collapsible.propTypes = {
    expanded: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default function Collapsible({ expanded = true, children, ...props }) {
    const ref = useRef(null)

    useEffect(() => {
        const { current } = ref

        if (!current) {
            return
        }

        current.style.maxHeight = `${expanded ? current.scrollHeight : 0}px`
    }, [expanded, ref.current])

    return (
        <div {...props} ref={ref} className={styles.Container}>
            {children}
        </div>
    )
}
