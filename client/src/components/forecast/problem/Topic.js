import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Problem.css'

Topic.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Topic({ title, src }) {
    return (
        <div styleName='Topic'>
            <h3 styleName='SubHeader'>
                {title}
            </h3>
            <img styleName='TopicImage' src={src} />
        </div>
    )
}

export default CSSModules(Topic, styles)
