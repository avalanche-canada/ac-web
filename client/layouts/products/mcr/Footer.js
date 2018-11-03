import React from 'react'
import { memo } from 'utils/react'
import logo from 'styles/mcr-logo.jpg'
import styles from './MountainConditionsReport.css'

function Footer() {
    const url = 'https://mountainconditions.com'

    return (
        <div className={styles.Footer}>
            <a href={url} title="Mountain Conditions Reports" target="mcr">
                <img src={logo} alt="MCR" />
            </a>
            <div>
                For more photos and more information about the professional
                mountain guide who created this report visit:
                <a href={url} target="mcr">
                    mountainconditions.com
                </a>
            </div>
        </div>
    )
}

export default memo.static(Footer)
