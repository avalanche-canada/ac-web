import React, { useRef, cloneElement, Children, memo } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

export const HEIGHT = 'HEIGHT'
export const WIDTH = 'WIDTH'

Collapse.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    dimension: PropTypes.oneOf([HEIGHT, WIDTH]),
    children: PropTypes.node.isRequired,
}

function Collapse({ collapsed = true, dimension = HEIGHT, children }) {
    const collapsable = useRef()
    let computed = null

    if (collapsable.current) {
        const margins = MARGINS.get(dimension)
        const propertyName = `offset${TITLIZED.get(dimension)}`

        computed =
            collapsable.current[propertyName] +
            styleOf(collapsable.current, margins[0]) +
            styleOf(collapsable.current, margins[1])
    }

    const defaultStyle = { value: collapsed ? 0 : computed }
    const style = { value: spring(collapsed ? 0 : computed) }

    return (
        <Motion defaultStyle={defaultStyle} style={style}>
            {style => (
                <div style={computeStyle(dimension, style.value, computed)}>
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
            [DIMENSIONS.get(dimension)]: '100%',
        }
    }

    return {
        [DIMENSIONS.get(dimension)]: `${value}px`,
        overflow: 'hidden',
    }
}

// Constants
const DIMENSIONS = new Map([[HEIGHT, 'height'], [WIDTH, 'width']])
const TITLIZED = new Map([[HEIGHT, 'Height'], [WIDTH, 'Width']])
const MARGINS = new Map([
    [HEIGHT, ['marginTop', 'marginBottom']],
    [WIDTH, ['marginLeft', 'marginRight']],
])
