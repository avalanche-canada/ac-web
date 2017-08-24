import { createElement } from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForKey } from '~/compose'

InnerHTML.propTypes = {
    children: PropTypes.string,
    component: PropTypes.string,
}

function InnerHTML({ children, component = 'div', ...rest }) {
    if (children) {
        return createElement(component, {
            ...rest,
            dangerouslySetInnerHTML: {
                __html: children,
            },
        })
    }

    return null
}

export default onlyUpdateForKey('children')(InnerHTML)
