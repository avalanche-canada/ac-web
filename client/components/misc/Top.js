import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Top.css'

Top.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
}

function Top({
    title = 'Go to top of document',
    children = 'Top'
}) {
    return (
        <a styleName='Fixed' href='#top' title={title}>
            {children}
        </a>
    )
}

export default CSSModules(Top, styles)
