import React, { PropTypes, Component, cloneElement, Children } from 'react'
import {findDOMNode} from 'react-dom'
import {Motion, spring} from 'react-motion'

export const HEIGHT = 'height'
export const WIDTH = 'width'

const CAPITALIZED = new Map([
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

const STYLE = {
    position: 'relative',
    paddingTop: 1,
    marginTop: -1,
    paddingBottom: 1,
    marginBottom: -1,
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
    collapsable = null
    get computed() {
        const {collapsable} = this

        if (!collapsable) {
            return null
        }

        const {dimension} = this.props
        const margins = MARGINS.get(dimension)
        const propertyName = `offset${CAPITALIZED.get(dimension)}`

        return collapsable[propertyName]
                + styleOf(collapsable, margins[0])
                + styleOf(collapsable, margins[1])
    }
    render() {
        const { collapsed, dimension, children } = this.props
        const child = Children.only(children)
        const defaultStyle = {
            [dimension]: collapsed ? 0 : this.computed,
        }
        const style = {
            [dimension]: spring(collapsed ? 0 : this.computed),
        }

        return (
            <Motion defaultStyle={defaultStyle} style={style}>
                {style => (
                    <div style={style} >
                        {cloneElement(child, {
                            ref: ref => this.collapsable = ref
                        })}
                    </div>
                )}
            </Motion>
        )
    }
}
