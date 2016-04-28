import React, { PropTypes } from 'react'
import { mapProps } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'

SocialItem.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function SocialItem({ text, children }) {
    return (
        <section styleName='SocialItem'>
            {text}
            {children}
        </section>
    )
}

export default CSSModules(SocialItem, styles)
