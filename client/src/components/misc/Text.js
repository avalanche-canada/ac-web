import React, {PropTypes, DOM, createElement} from 'react'
import {compose, branch, renderComponent, renderNothing, setPropTypes, withProps} from 'recompose'
import {Element} from 'compose'
import styles from './Text.css'

// TODO Better recompose usage

function I(component) {
    return component
}
const component = DOM.p
const element = Element({
    name: 'Text',
    component,
    styles,
})

Text.propTypes = {
    children: PropTypes.node,
    hide: PropTypes.bool,
}

export default function Text({children, hide = false}) {
    if (hide) {
        return null
    }

    return createElement(element, null, children)
}

export const Loading = withProps({
    children: 'Loading...'
})(Element({
    name: 'Loading',
    component,
    styles,
}))
