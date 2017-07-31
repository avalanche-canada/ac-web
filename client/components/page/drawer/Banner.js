import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

Banner.propTypes = {
    url: PropTypes.string.isRequired,
}

function Banner({ url, ...props }) {
    return <img styleName="Banner" src={url} {...props} />
}

export default CSSModules(Banner, styles)
