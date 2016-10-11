import React, {PropTypes, createElement} from 'react'
import {onlyUpdateForKey} from 'compose'

InnerHTML.propTypes = {
    children: PropTypes.string,
    component: PropTypes.string,
}

function InnerHTML({children, component = 'div', ...props}) {
    if (!children) {
        return null
    }

    return createElement(component, {
        ...props,
        dangerouslySetInnerHTML: {
            __html: children
        }
    })
}

export default onlyUpdateForKey('children')(InnerHTML)
