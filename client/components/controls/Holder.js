import React from 'react'
import PropTypes from 'prop-types'
import styles from './Controls.css'

Holder.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default function Holder({ value, placeholder }) {
    const className = value ? 'Valueholder' : 'Placeholder'

    return (
        <div className={styles[className]}>
            <div className={styles['Holder--Content']}>
                {value || placeholder}
            </div>
        </div>
    )
}
