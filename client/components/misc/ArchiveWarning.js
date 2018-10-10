import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import Alert, { WARNING } from 'components/alert'
import styles from './ArchiveWarning.css'

ArchiveWarning.propTypes = {
    nowcast: PropTypes.shape({
        to: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    }),
    previous: PropTypes.shape({
        to: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    }),
    next: PropTypes.shape({
        to: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    }),
    children: PropTypes.number.isRequired,
}

export default function ArchiveWarning({ nowcast, previous, next, children }) {
    return (
        <Alert type={WARNING}>
            {children}
            <Link className={styles.Today} {...nowcast} />
            <div className={styles.Links}>
                {previous && <Link {...previous} className={styles.Previous} />}
                {next && <Link {...next} className={styles.Next} />}
            </div>
        </Alert>
    )
}
