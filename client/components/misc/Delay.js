import PropTypes from 'prop-types'
import { useTimeout } from 'utils/react/hooks'

// TODO Use Suspense instead of the component

Delay.propTypes = {
    children: PropTypes.node,
    elapse: PropTypes.number,
}

export default function Delay({ children = null, elapse = 0 }) {
    return useTimeout(elapse) ? children : null
}
