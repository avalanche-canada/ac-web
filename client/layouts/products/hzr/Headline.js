import React from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'
import styles from './HotZoneReport.css'

Headline.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
        .isRequired,
}

export default function Headline({ children }) {
    return (
        <div className={styles.Headline}>
            {typeof children === 'string' ? (
                children
            ) : (
                <StructuredText value={children} />
            )}
        </div>
    )
}
