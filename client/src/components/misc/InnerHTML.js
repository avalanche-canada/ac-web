import React, {PropTypes, createElement} from 'react'

InnerHTML.propTypes = {
    children: PropTypes.string,
    component: PropTypes.string,
}

export default function InnerHTML({children, component = 'div', ...props}) {
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
