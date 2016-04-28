import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

function Article({ children }) {
    return (
        <article styleName='Article'>
            {children}
        </article>
    )
}

export default CSSModules(Article, styles)
