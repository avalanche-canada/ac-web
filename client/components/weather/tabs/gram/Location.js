import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Gram.css'
import { useFullscreen } from 'utils/react/hooks'

Location.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default function Location({ children }) {
    const [header, image] = children
    const [ref, enter] = useFullscreen()

    return (
        <section className={styles.Location} onClick={enter}>
            {header}
            {cloneElement(image, { ref })}
        </section>
    )
}
