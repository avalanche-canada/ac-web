import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Br } from '../components/misc'
import styles from './Page.css'

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

function Header({ title }) {
    return (
        <header styleName='Header'>
            <h1>{title}</h1>
            <Br withRibbon />
        </header>
    )
}

export default CSSModules(Header, styles)
