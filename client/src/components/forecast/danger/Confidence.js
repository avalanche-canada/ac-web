import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'

Confidence.propTypes = {
    level: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
}

function Confidence({level, comment}) {
    return (
        <div styleName='Confidence'>
            <dl>
                <dt>Confidence</dt>
                <dd>
                    <strong>{level}</strong>
                    <span styleName='Confidence--Comment'>{comment}</span>
                </dd>
            </dl>
        </div>
    )
}

export default CSSModules(Confidence, styles)
