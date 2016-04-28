import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Biography.css'
import { Image } from '../media'

Biography.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

function Biography({ name, title, avatar, children }) {
    return (
        <section styleName='Container'>
            <div styleName='Media'>
                <Image src={avatar}></Image>
            </div>
            <header styleName='Header'>
                <span styleName='Name'>{name}</span>
                <span styleName='Title'>{title}</span>
            </header>
            {children}
        </section>
    )
}

export default CSSModules(Biography, styles)
