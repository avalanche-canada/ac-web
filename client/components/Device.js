import PropTypes from 'prop-types'

// TODO: HOOKS

Device.propTypes = {
    children: PropTypes.func.isRequired,
}

export default function Device({ children }) {
    return children(STATE)
}

const STATE = {
    isTouchable: 'ontouchstart' in window,
}
