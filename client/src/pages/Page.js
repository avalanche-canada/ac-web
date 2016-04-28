import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'
import Header from './Header'

Page.propTypes = {
    title: PropTypes.string,
}

function Page({ title, children }) {
    return (
        <main styleName='Main'>
            {title && <Header title={title} />}
            {children}
        </main>
    )
}

export default CSSModules(Page, styles)
