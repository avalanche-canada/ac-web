import React, { isValidElement, createElement } from 'react'
import PropTypes from 'prop-types'
import Contact from './Contact'
import Share from './Share'
import Follow from './Follow'
import Sidebar from './Sidebar'

export Sidebar from './Sidebar'
export Item from './Item'
export Header from './Header'
export Share from './Share'
export Follow from './Follow'
export Contact from './Contact'
export RSSFeed from './RSSFeed'
export Print from './Print'

CompleteSidebar.propTypes = {
    contact: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    share: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    follow: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    children: PropTypes.node,
}

export default function CompleteSidebar({ children, contact, share, follow }) {
    return (
        <Sidebar>
            {children}
            {createSocialElement(share, Share)}
            {createSocialElement(follow, Follow)}
            {createSocialElement(contact, Contact)}
        </Sidebar>
    )
}

// Utils
function createSocialElement(element, component) {
    if (element === true) {
        return createElement(component)
    }

    return isValidElement(element) ? element : null
}
