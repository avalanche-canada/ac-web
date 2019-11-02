import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'
import { useScroll } from 'hooks'

Body.propTypes = {
    children: PropTypes.node,
    onScroll: PropTypes.func,
}

export default function Body({ children }) {
    const ref = useRef(null)
    const [x] = useScroll(ref)
    const style = x > 0 ? TOP_BORDER : null

    return (
        <div ref={ref} className={styles.Body} style={style}>
            {children}
        </div>
    )
}

// Styles
const TOP_BORDER = {
    borderTopColor: 'rgba(0, 0, 0, 0.15)',
}
