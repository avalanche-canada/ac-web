import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Br} from 'components/misc'
import {Section} from 'components/page'
import styles from './Section.css'

Splash.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    main: PropTypes.node.isRequired,
    second: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Splash({title, children}) {
    return (
        <section styleName='Splash'>
            <header styleName='Splash--Header'>
                {title && <h1>{title}</h1>}
                <Br withRibbon />
            </header>
            <div styleName='Splash--Content'>
                {children}
                {children}
            </div>
        </section>
    )
}

export default CSSModules(Splash, styles)
