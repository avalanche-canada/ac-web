import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './MountainInformationNetwork.css'

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

function Section({title, children}) {
    return (
        <div styleName='Section'>
            <h4 styleName='Section--Title'>{title}</h4>
            <div styleName='Section--Content'>{children}</div>
        </div>
    )
}

export default CSSModules(Section, styles)
