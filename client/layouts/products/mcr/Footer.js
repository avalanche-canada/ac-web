import { linkHorizontal } from 'd3-shape'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import logo from 'styles/mcr-logo.jpg'
import styles from './MountainConditionsReport.css'

export default function Footer() {
    const url = 'https://mountainconditions.com'

    return (
        <div className={styles.Footer}>
            <a href={url} title="Mountain Conditions Reports" target="mcr">
                <img src={logo} alt="MCR" />
            </a>
            <div>
                <FormattedMessage
                    description="Layout products/mcr/Footer"
                    defaultMessage="For more photos and more information about the professional mountain guide who created this report visit: <link>mountainconditions.com</link>."
                    values={{
                        link(text) {
                            return (
                                <a href={url} target="mcr">
                                    {text}
                                </a>
                            )
                        },
                    }}
                />
            </div>
        </div>
    )
}
