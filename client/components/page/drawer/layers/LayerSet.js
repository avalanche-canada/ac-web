import React from 'react'
import PropTypes from 'prop-types'
import { Subject } from '../'
import styles from './Layer.module.css'

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
