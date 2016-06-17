import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Article.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
}

function Article({title, children}) {
    return (
        <article>
            {title && <h2>{title}</h2>}
            {children}
        </article>
    )
}

export default CSSModules(Article, styles)
