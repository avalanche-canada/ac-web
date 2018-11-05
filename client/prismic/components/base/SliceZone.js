import { memo, createElement } from 'react'
import PropTypes from 'prop-types'
import SliceComponents from '../slice'

SliceZone.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    components: PropTypes.instanceOf(Map),
}

function SliceZone({ value, components = SliceComponents, ...rest }) {
    function renderSlice({ type, ...props }, index) {
        return components.has(type)
            ? createElement(
                  components.get(type),
                  Object.assign(props, rest, { key: index })
              )
            : null
    }

    return value.map(renderSlice)
}

export default memo(SliceZone)
