import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { compose } from 'recompose'
import styles from './News.css'

Entry.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    entry: PropTypes.object.isRequired,
}

function Entry({ children }) {
    return (
        <div styleName='Entry'>
            {children}
        </div>
    )
}

export default CSSModules(Entry, styles)
