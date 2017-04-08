import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MountainInformationNetwork.css'

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

function Section({title = 'Information', children}) {
    return (
        <div styleName='Section'>
            <h4 styleName='Section--Title'>{title}</h4>
            <div styleName='Section--Content'>{children}</div>
        </div>
    )
}

export default CSSModules(Section, styles)
