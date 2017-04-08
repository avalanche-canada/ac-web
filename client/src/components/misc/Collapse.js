import React, {Component, cloneElement, Children} from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'
import {Motion, spring} from 'react-motion'

export const HEIGHT = 'HEIGHT'
export const WIDTH = 'WIDTH'

const DIMENSIONS = new Map([
    [HEIGHT, 'height'],
    [WIDTH, 'width'],
])
const TITLIZED = new Map([
    [HEIGHT, 'Height'],
    [WIDTH, 'Width'],
])
const MARGINS = new Map([
    [HEIGHT, ['marginTop', 'marginBottom']],
    [WIDTH, ['marginLeft', 'marginRight']],
])

function styleOf({style}, propertyName) {
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

export default class Collapse extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        dimension: PropTypes.oneOf([HEIGHT, WIDTH]),
        collapsed: PropTypes.bool.isRequired,
    }
    static defaultProps = {
        collapsed: true,
        dimension: HEIGHT,
    }
    state = {
        opened: false
    }
    constructor(props) {
        super(props)

        this.state.opened = !props.collapsed
    }
    collapsable = null
    get computed() {
        const {collapsable} = this

        if (!collapsable) {
            return null
        }

        const {dimension} = this.props
        const margins = MARGINS.get(dimension)
        const propertyName = `offset${TITLIZED.get(dimension)}`

        return collapsable[propertyName]
                + styleOf(collapsable, margins[0])
                + styleOf(collapsable, margins[1])
    }
    render() {
        const {collapsed, dimension, children} = this.props
        const {computed} = this
        const child = Children.only(children)
        const defaultStyle = {
            value: collapsed ? 0 : computed,
        }
        const style = {
            value: spring(collapsed ? 0 : computed),
        }

        return (
            <Motion defaultStyle={defaultStyle} style={style}>
                {style => (
                    <div style={computeStyle(dimension, style.value, computed)} >
                        {cloneElement(child, {
                            ref: ref => this.collapsable = ref
                        })}
                    </div>
                )}
            </Motion>
        )
    }
}
