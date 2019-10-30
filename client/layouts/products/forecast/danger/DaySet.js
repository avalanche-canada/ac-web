import { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

DaySet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function DaySet({ children }) {
    return Children.map(children, (child, index) =>
        cloneElement(child, { mountain: index === 0 })
    )
}
