import React, { Component } from 'react'
import styles from './MountainConditionsReport.css'
import logo from 'styles/mcr-logo.jpg'

export default class Footer extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
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
}
