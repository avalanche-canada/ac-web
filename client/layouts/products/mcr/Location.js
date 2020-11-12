import React from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from 'components/misc'
import styles from './MountainConditionsReport.css'

Location.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Location({ children }) {
    return children ? (
        <div className={styles.Location}>
            <InnerHTML className={styles.LocationDescription}>
                {children}
            </InnerHTML>
        </div>
    ) : null
}
