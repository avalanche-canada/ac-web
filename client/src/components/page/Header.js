import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'
import { Sponsor } from '../misc'

Header.propTypes = {
    title: PropTypes.string.isRequired,
    sponsor: PropTypes.shape(Sponsor.propTypes),
    children: PropTypes.node,
}

function Header({ title, sponsor, children }) {
    if (!sponsor && !children) {
        return (
            <h1 styleName='Header'>
                {title}
            </h1>
        )
    }

    return (
        <header styleName='Header'>
            <h1>{title}</h1>
            {sponsor && <Sponsor {...sponsor} />}
            {children}
        </header>
    )
}

export default CSSModules(Header, styles)
