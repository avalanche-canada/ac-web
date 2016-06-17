import React, { PropTypes, DOM } from 'react'
import {compose, setDisplayName, mapProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Misc.css'

// TODO: Need to extend to all type of text....see Bootstrap for example
// TODO: Show should be removed...and perhaps replace with hide !!!!

Text.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
}

function Text({show = false, children}) {
    if (!show) {
        return null
    }

    return (
        <p styleName='Text'>
            {children}
        </p>
    )
}

Text = CSSModules(Text, styles)

export default Text

export function createText(displayName, defaultText) {
    return compose(
        setDisplayName(displayName),
        mapProps(({children, ...rest}) => ({
            ...rest,
            children: children || defaultText
        }))
    )(Text)
}
