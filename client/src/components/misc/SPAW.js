import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Link from 'prismic/components/Link'
import styles from './SPAW.css'

SPAW.propTypes = {
    children: PropTypes.node,
    href: PropTypes.object,
}

function SPAW({children = 'Special Avalanche Warning', link, style}) {
    if (!link) {
        return (
            <span styleName='SPAW'>
                {children}
            </span>
        )
    }
    return (
        <Link styleName='SPAW' document={link} style={style}>
            {children}
        </Link>
    )
}

export default CSSModules(SPAW, styles)
