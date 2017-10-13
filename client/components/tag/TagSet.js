import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Tag.css'

TagSet.propTypes = {
    children: PropTypes.node.isRequired,
}

function TagSet({ children }) {
    return (
        <ul styleName="Set">
            {children}
        </ul>
    )
}

export default CSSModules(TagSet, styles)
