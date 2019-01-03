import { Component, createContext, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'

const MapContext = createContext()

export default MapContext

export class WithMap extends Component {
    static propTypes = {
        children: PropTypes.element,
        loaded: PropTypes.bool,
        map: PropTypes.object,
    }
    static contextType = MapContext
    render() {
        const { map, loaded } = this.context

        if (this.props.loaded) {
            if (map && loaded) {
                return renderChildren.call(this)
            } else {
                return null
            }
        } else {
            if (map) {
                return renderChildren.call(this)
            } else {
                return null
            }
        }
    }
}

// Utils
function renderChildren() {
    const { children } = this.props
    const { map } = this.context

    return typeof children === 'function'
        ? children(map)
        : Children.map(children, child => cloneElement(child, { map }))
}
