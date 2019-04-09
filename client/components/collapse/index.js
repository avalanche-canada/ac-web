import React, { useRef, cloneElement, Children, memo } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

export const HEIGHT = 'HEIGHT'

Collapse.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

function Collapse({ collapsed = true, children }) {
    const collapsable = useRef()
    let computed = null

    if (collapsable.current) {
        computed =
            collapsable.current.offsetHeight +
            styleOf(collapsable.current, 'marginTop') +
            styleOf(collapsable.current, 'marginBottom')
    }

    const defaultStyle = { value: collapsed ? 0 : computed }
    const style = { value: spring(collapsed ? 0 : computed) }

    return (
        <Motion defaultStyle={defaultStyle} style={style}>
            {style => (
                <div style={computeStyle('height', style.value, computed)}>
                    {cloneElement(Children.only(children), {
                        ref: collapsable,
                    })}
                </div>
            )}
        </Motion>
    )
}

export default memo(Collapse)

// Utils
function styleOf({ style }, propertyName) {
    return parseInt(style[propertyName] || 0, 10)
}

function computeStyle(dimension, value, computed) {
    if (value === computed) {
        return {
            height: '100%',
        }
    }

    return {
        height: `${value}px`,
        overflow: 'hidden',
    }
}
