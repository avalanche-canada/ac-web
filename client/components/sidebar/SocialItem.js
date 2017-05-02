import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'

SocialItem.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
}

function SocialItem({ label, children }) {
    return (
        <div styleName="SocialItem">
            {label &&
                <span styleName="Label">
                    {label}
                </span>}
            {children}
        </div>
    )
}

export default CSSModules(SocialItem, styles)
