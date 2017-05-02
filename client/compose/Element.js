import { DOM } from 'react'
import PropTypes from 'prop-types'
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose'
import CSSModules from 'react-css-modules'

export default function Element({
    component = DOM.div,
    name,
    styleName = name,
    styles,
    propTypes = {
        children: PropTypes.node,
    },
}) {
    return compose(
        setDisplayName(name),
        setPropTypes(propTypes),
        CSSModules(styles),
        withProps({ styleName })
    )(component)
}
