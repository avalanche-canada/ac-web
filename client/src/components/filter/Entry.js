import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Filter.css'

Entry.propTypes = {
    children: PropTypes.element.isRequired,
}

function Entry({ children }) {
    return (
        <div styleName='Entry'>
            {children}
        </div>
    )
}

export default CSSModules(Entry, styles)
