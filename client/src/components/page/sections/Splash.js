import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {Br} from '/components/misc'
import {Section} from '/components/page'
import styles from './Sections.css'

Splash.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

function Splash({title, children}) {
    return (
        <section styleName='Splash'>
            <header styleName='Splash--Header'>
                {title && <h1>{title}</h1>}
                <Br ribbon />
            </header>
            <div styleName='Splash--Content'>
                {children}
            </div>
        </section>
    )
}

export default CSSModules(Splash, styles)
