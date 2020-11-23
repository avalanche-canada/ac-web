import React from 'react'
import PropTypes from 'prop-types'
import { FormattedList } from 'react-intl'
import styles from './MountainConditionsReport.module.css'

Submitter.propTypes = {
    certification: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    groups: PropTypes.array,
}

export default function Submitter({ name, image, groups }) {
    return (
        <div className={styles.Submitter}>
            <img src={image} title={name} alt={name} />
            <div>
                <span>{name}</span>
                <span>
                    <FormattedList type="conjunction" value={groups.map(group => group.name)} />
                </span>
            </div>
        </div>
    )
}
