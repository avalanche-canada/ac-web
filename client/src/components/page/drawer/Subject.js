import React, {PropTypes} from 'react'
import {compose} from 'recompose'
import CSSModules from 'react-css-modules'
import {neverUpdate} from 'compose'
import styles from './Drawer.css'

Subject.propTypes = {
    children: PropTypes.string.isRequired,
}

function Subject({children}) {
    return (
        <div styleName='Subject'>
            <span>{children}</span>
        </div>
    )
}

export default compose(
    neverUpdate,
    CSSModules(styles),
)(Subject)
