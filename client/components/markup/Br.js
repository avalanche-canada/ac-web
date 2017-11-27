import React from 'react'
import PropTypes from 'prop-types'
import styles from './Br.css'

Br.propTypes = {
    ribbon: PropTypes.bool,
}

export default function Br({ ribbon }) {
    const className = ribbon ? 'Ribbon' : 'Main'

    return <div className={styles[className]} />
}
