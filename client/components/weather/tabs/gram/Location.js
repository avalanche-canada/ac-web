import React, { cloneElement, useState } from 'react'
import PropTypes from 'prop-types'
import Fullscreen from 'components/Fullscreen'
import styles from './Gram.css'

Location.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default function Location({ children }) {
    // TODO Use forwardRef
    const [target, setTarget] = useState(null)

    return (
        <Fullscreen target={target}>
            {({ enter }) => {
                const [header, image] = children

                return (
                    <section className={styles.Location} onClick={enter}>
                        {header}
                        {cloneElement(image, { ref: setTarget })}
                    </section>
                )
            }}
        </Fullscreen>
    )
}
