import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MountainConditionsReport.css'

Submitter.propTypes = {
    certification: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}

function Submitter({ name, image, certification }) {
    return (
        <div styleName="Submitter">
            <img src={image} alt="ACMG Logo" />
            <span>{[certification, name].filter(Boolean).join(' - ')}</span>
        </div>
    )
}

export default CSSModules(Submitter, styles)
