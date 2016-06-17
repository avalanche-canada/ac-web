import { PropTypes, DOM } from 'react'
import CSSModules from 'react-css-modules'
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose'

const {div} = DOM
const PROP_TYPES = {
    children: PropTypes.element.isRequired,
}

export default function Element({
    name,
    styleName = name,
    styles,
    component = div,
    propTypes = PROP_TYPES
}) {
    if (styles) {
        component = CSSModules(component, styles)
    }

    return compose(
        setDisplayName(name),
        setPropTypes(PROP_TYPES),
        withProps({styleName}),
    )(component)
}
