import React from 'react'
import { memo } from 'utils/react'
import PropTypes from 'prop-types'
import styles from './Br.css'

Br.propTypes = {
    ribbon: PropTypes.bool,
}

function Br({ ribbon }) {
    const className = ribbon ? 'Ribbon' : 'Main'

    return <div className={styles[className]} />
}

export default memo.static(Br)
