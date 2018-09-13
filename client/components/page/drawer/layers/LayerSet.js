import React from 'react'
import PropTypes from 'prop-types'
import Subject from '../Subject'
import styles from './Layer.css'

LayerSet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default function LayerSet({ title, children }) {
    return (
        <div className={styles.LayerSet}>
            <Subject>{title}</Subject>
            {children}
        </div>
    )
}
