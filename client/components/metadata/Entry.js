import React from 'react'
import PropTypes from 'prop-types'
import styles from './Metadata.css'

Entry.propTypes = {
    term: PropTypes.string,
    children: PropTypes.node.isRequired,
    // TODO: Review the need of this property
    sideBySide: PropTypes.bool,
    fullWidth: PropTypes.bool,
}

export default function Entry({
    term,
    children,
    sideBySide,
    fullWidth,
    ...props
}) {
    let className = 'Entry'

    if (sideBySide) {
        className = 'Entry--SideBySide'
    } else if (fullWidth) {
        className = 'Entry--Full'
    }

    return (
        <dl {...props} className={styles[className]}>
            <dt className={styles.Term}>{term}</dt>
            <dd className={styles.Description}>{children}</dd>
        </dl>
    )
}
