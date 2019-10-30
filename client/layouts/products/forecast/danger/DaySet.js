import { Children, createElement } from 'react'
import PropTypes from 'prop-types'
import { FirstDay } from './Day'

DaySet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function DaySet({ children }) {
    return Children.map(children, (day, index) =>
        index ? day : createElement(FirstDay, day.props)
    )
}
