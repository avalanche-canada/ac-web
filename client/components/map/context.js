import { useContext, createContext, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'

const MapContext = createContext()

export default MapContext

WithMap.propTypes = {
    children: PropTypes.element,
    loaded: PropTypes.bool,
}

export function WithMap({ children, loaded }) {
    const context = useContext(MapContext)
    function renderChildren() {
        return typeof children === 'function'
            ? children(context.map)
            : Children.map(children, child =>
                  cloneElement(child, { map: context.map })
              )
    }

    if (loaded) {
        if (context.map && context.loaded) {
            return renderChildren()
        } else {
            return null
        }
    } else {
        if (context.map) {
            return renderChildren()
        } else {
            return null
        }
    }
}
