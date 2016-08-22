import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Blockquote.css'

function Blockquote({children}) {
    return (
        <blockquote styleName='Blockquote'>
            {children}
        </blockquote>
    )
}

export default CSSModules(Blockquote, styles)
