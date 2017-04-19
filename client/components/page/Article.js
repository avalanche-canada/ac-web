import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Article.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

function Article({title, children}) {
    return (
        <article styleName='Article'>
            {title && <h2>{title}</h2>}
            {children}
        </article>
    )
}

export default CSSModules(Article, styles)
