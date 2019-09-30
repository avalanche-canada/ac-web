import { createElement } from 'react'
import PropTypes from 'prop-types'
import SliceComponents from '../slice'

SliceZone.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    components: PropTypes.instanceOf(Map),
}

export default function SliceZone({
    value = [],
    components = SliceComponents,
    ...rest
}) {
    function renderSlice({ slice_type, ...props }, index) {
        return components.has(slice_type)
            ? createElement(
                  components.get(slice_type),
                  Object.assign(props, rest, { key: index })
              )
            : null
    }

    return value.map(renderSlice)
}
