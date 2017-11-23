import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Alert, { WARNING } from 'components/alert'
import styles from './ArchiveWarning.css'

const LinkPropType = PropTypes.shape({
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
})

ArchiveWarning.propTypes = {
    nowcast: LinkPropType,
    previous: LinkPropType,
    next: LinkPropType,
    children: PropTypes.number.isRequired,
}

export default function ArchiveWarning({ nowcast, previous, next, children }) {
    const links = []

    if (previous) {
        links.push(
            <Link key="previous" {...previous} className={styles.Previous} />
        )
    }

    if (next) {
        links.push(<Link key="next" {...next} className={styles.Next} />)
    }

    return (
        <Alert type={WARNING}>
            {children}
            <Link className={styles.Today} {...nowcast} />
            <div className={styles.Links}>{links}</div>
        </Alert>
    )
}
