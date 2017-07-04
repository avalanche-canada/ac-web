import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

Banner.propTypes = {
    url: PropTypes.string,
}

function Banner({ url, ...rest }) {
    return <img styleName="Banner" {...rest} src={url} />
}

export default CSSModules(Banner, styles)
