import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

Banner.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
}

function Banner({url, description = null, children}) {
    const style = {
        backgroundImage: `url("${url}")`
    }

    return (
        <div title={description} style={style} styleName='Banner'>
            {children}
        </div>
    )
}

export default CSSModules(Banner, styles)
