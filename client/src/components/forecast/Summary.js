import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {InnerHTML} from 'components/misc'
import styles from './Forecast.css'

Summary.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

function Summary({title, children}) {
    return (
        <div styleName='Summary'>
            <h3>{title}</h3>
            {typeof children === 'string' ?
                <InnerHTML>{children}</InnerHTML> :
                children
            }
        </div>
    )
}

export default CSSModules(Summary, styles)
