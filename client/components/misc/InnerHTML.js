import { createElement, memo } from 'react'
import PropTypes from 'prop-types'

InnerHTML.propTypes = {
    children: PropTypes.string,
    component: PropTypes.string,
}

function InnerHTML({ component = 'div', children, ...props }) {
    if (!children) {
        return null
    }

    props.dangerouslySetInnerHTML = {
        __html: children,
    }

    return createElement(component, props)
}

export default memo(InnerHTML)
