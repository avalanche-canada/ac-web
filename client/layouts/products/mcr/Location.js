import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from 'components/misc'
import styles from './MountainConditionsReport.css'

Location.propTypes = {
    children: PropTypes.string.isRequired,
}

function Location({ children }) {
    return children ? (
        <div className={styles.Location}>
            <InnerHTML className={styles.LocationDescription}>
                {children}
            </InnerHTML>
        </div>
    ) : null
}

export default memo(Location)
