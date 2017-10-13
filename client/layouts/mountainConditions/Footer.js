import React from 'react'
import { compose } from 'recompose'
import CSSModules from 'react-css-modules'
import { neverUpdate } from '~/compose'
import styles from './MountainConditionsReport.css'
import logo from '~/styles/mcr-logo.jpg'

function Footer() {
    const url = 'https://mountainconditions.com'

    return (
        <div styleName="Footer">
            <a href={url} title="Mountain Conditions Reports" target="_blank">
                <img src={logo} alt="MCR" />
            </a>
            <div>
                For more photos and more information about the professional mountain guide who created this report visit:
                <a href={url} target="_blank">
                    mountainconditions.com
                </a>
            </div>
        </div>
    )
}

export default compose(neverUpdate, CSSModules(styles))(Footer)
