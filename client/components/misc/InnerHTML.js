import { createElement, memo } from 'react'
import PropTypes from 'prop-types'

InnerHTML.propTypes = {
    children: PropTypes.string,
    component: PropTypes.string,
}

function InnerHTML({ component = 'div', children, ...props }) {
    if (children) {
        props.dangerouslySetInnerHTML = {
            __html: children,
        }

        return createElement(component, props)
    }

    return null
}

export default memo(InnerHTML)
