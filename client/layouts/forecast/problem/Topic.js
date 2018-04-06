import React from 'react'
import PropTypes from 'prop-types'
import styles from './Problem.css'

Topic.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default function Topic({ title, src }) {
    return (
        <figure className={styles.Topic}>
            <div className={styles['Topic--Content']}>
                <img src={src} />
            </div>
            <figcaption>{title}</figcaption>
        </figure>
    )
}
