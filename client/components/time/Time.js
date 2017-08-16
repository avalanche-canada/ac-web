import React from 'react'
import PropTypes from 'prop-types'
import parse from 'date-fns/parse'
import formatDate from 'date-fns/format'

Time.propTypes = {
    value: PropTypes.instanceOf(Date),
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    children: PropTypes.node,
}

export default function Time({ value = new Date(), format, children }) {
    const date = parse(value)

    if (typeof format === 'function') {
        format = format(value)
    }

    return (
        <time dateTime={formatDate(date)}>
            {children || formatDate(date, format)}
        </time>
    )
}
