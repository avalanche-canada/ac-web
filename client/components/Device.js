import { memo } from 'react'
import PropTypes from 'prop-types'

// TODO: HOOKS

Device.propTypes = {
    children: PropTypes.func.isRequired,
}

function Device({ children }) {
    return children({
        isTouchable: 'ontouchstart' in window,
    })
}

export default memo(Device)

export function touchable({ isTouchable }) {
    return isTouchable ? 'Tap' : 'Click'
}
