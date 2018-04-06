import React from 'react'
import PropTypes from 'prop-types'
import styles from './MountainConditionsReport.css'

Submitter.propTypes = {
    certification: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    groups: PropTypes.array,
}

export default function Submitter({ name, image, groups }) {
    return (
        <div className={styles.Submitter}>
            <img src={image} alt="ACMG Logo" />
            <div>
                <span>{name}</span>
                <span>{groups.map(g => g.name).join(', ')}</span>
            </div>
        </div>
    )
}
