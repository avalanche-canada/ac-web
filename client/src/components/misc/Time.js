import React, {PropTypes} from 'react'
import {compose, setDisplayName, withProps, mapProps} from 'recompose'
import moment from 'moment'

Time.propTypes = {
    value: PropTypes.instanceOf(Date),
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export function createTime(displayName, format) {
    return compose(
        setDisplayName(displayName),
        withProps({format}),
    )(Time)
}

export default function Time({ value = new Date(), format = 'hh:mm', children }) {
    const date = moment(value)

    if (typeof format === 'function') {
        format = format(value)
    }


    return (
        <time dateTime={date.format()}>
            {children || date.format(format)}
        </time>
    )
}
