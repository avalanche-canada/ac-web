import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Credit } from 'components/markup'
import { ElementResize } from 'components/misc'
import styles from './Page.css'

const STYLE = {
    height: '100%',
}

Banner.propTypes = {
    url: PropTypes.string.isRequired,
    copyright: PropTypes.string,
    children: PropTypes.node,
}

function Banner({ url, copyright, children }) {
    const style = {
        backgroundImage: `url("${url}")`,
    }

    return (
        <div styleName="Banner" style={style}>
            {copyright &&
                <ElementResize style={STYLE}>
                    {width => (
                        <Credit compact={width < 400}>{copyright}</Credit>
                    )}
                </ElementResize>}
            {children}
        </div>
    )
}

export default CSSModules(Banner, styles)
