import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Banner.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
}

function Banner({url, children}) {
    const style = {
        backgroundImage: `url("${url}")`
    }

    return (
        <div styleName='Banner' style={style} >
            {children}
        </div>
    )
}

export default CSSModules(Banner, styles)
