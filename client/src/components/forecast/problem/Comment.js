import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Problem.css'
import {InnerHTML} from 'components/misc'

Comment.propTypes = {
    children: PropTypes.string.isRequired,
}

function Comment({ children }) {
    return (
        <div styleName='Comment'>
            <InnerHTML>
                {children}
            </InnerHTML>
        </div>
    )
}

export default CSSModules(Comment, styles)
