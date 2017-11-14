import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Link from 'prismic/components/Link'
import styles from './SPAW.css'

SPAW.propTypes = {
    href: PropTypes.object,
    link: PropTypes.object,
    style: PropTypes.object,
    children: PropTypes.node,
}

function SPAW({ children = 'Special Public Avalanche Warning', link, style }) {
    if (!link) {
        return (
            <span styleName="SPAW">
                {children}
            </span>
        )
    }
    return (
        <Link styleName="SPAW" document={link} style={style}>
            {children}
        </Link>
    )
}

export default CSSModules(SPAW, styles)
