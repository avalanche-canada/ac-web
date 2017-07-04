import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MountainConditionsReport.css'
import logo from '~/styles/acmg-logo.png'

Submitter.propTypes = {
    certification: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

function Submitter({ name, certification }) {
    const title =
        'Visit the Association of Canadian Mountain Guides (ACMG) website'
    const url = 'http://acmg.ca/'

    return (
        <div styleName="Submitter">
            <a href={url} title={title}>
                <img src={logo} alt="ACMG Logo" />
            </a>
            <span>{certification} - {name}</span>
        </div>
    )
}

export default CSSModules(Submitter, styles)
