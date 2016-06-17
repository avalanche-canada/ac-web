import React, {PropTypes, createElement} from 'react'

InnerHTML.propTypes = {
    children: PropTypes.string.isRequired,
    component: PropTypes.string,
}

export default function InnerHTML({children, component = 'div'}) {
    if (!children) {
        return null
    }

    return createElement(component, {
        dangerouslySetInnerHTML: {
            __html: children
        }
    })
}
