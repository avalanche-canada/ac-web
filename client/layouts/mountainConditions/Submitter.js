import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MountainConditionsReport.css'

Submitter.propTypes = {
    certification: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    groups: PropTypes.array,
}

function Submitter({ name, image, groups}) {
    return (
        <div styleName="Submitter">
            <img src={image} alt="ACMG Logo" />
            <div>
                <span>{name}</span>
                <span>{groups.map(g => g.name).join(', ')}</span>
            </div>
        </div>
    )
}

export default CSSModules(Submitter, styles)
