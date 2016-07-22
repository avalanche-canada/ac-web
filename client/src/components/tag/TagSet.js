import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tag.css'

TagSet.propTypes = {
    children: PropTypes.array
}

function TagSet({ children }) {
    return (
        <ul styleName='Set'>
            {children}
        </ul>
    )
}

export default CSSModules(TagSet, styles)
