import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/button'
import styles from './File.css'

Description.propTypes = {
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
}

export default function Description({ index, total, onRemoveClick }) {
    return (
        <div className={styles.Description}>
            {index + 1} / {total}
            <Button onClick={onRemoveClick}>Remove</Button>
        </div>
    )
}
