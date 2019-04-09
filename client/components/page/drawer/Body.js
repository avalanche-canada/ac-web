import React, { useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import noop from 'lodash/noop'
import styles from './Drawer.css'

// TODO Improve that component with the container

Body.propTypes = {
    children: PropTypes.node,
    onScroll: PropTypes.func,
}

export default function Body({ children, onScroll = noop, ...props }) {
    const ref = useRef()
    const handleScroll = useMemo(() => {
        return throttle(() => {
            if (!ref?.current) {
                return
            }

            const { scrollLeft, scrollTop } = ref.current

            onScroll({ left: scrollLeft, top: scrollTop })
        }, 250)
    })

    return (
        <div
            {...props}
            ref={ref}
            onScroll={handleScroll}
            className={styles.Body}>
            {children}
        </div>
    )
}
