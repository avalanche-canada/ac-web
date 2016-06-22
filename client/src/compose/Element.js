import {PropTypes, DOM} from 'react'
import CSSModules from 'react-css-modules'
import {compose, setDisplayName, setPropTypes, withProps} from 'recompose'

export default function Element({
    component = DOM.div,
    name,
    styleName = name,
    styles,
    propTypes = {
        children: PropTypes.element,
    }
}) {
    if (styles) {
        component = CSSModules(component, styles)
    }

    return compose(
        setDisplayName(name),
        setPropTypes(propTypes),
        withProps({styleName}),
    )(component)
}
