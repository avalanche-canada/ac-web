import React, {PropTypes} from 'react'
import {compose, setDisplayName, withProps} from 'recompose'
import moment from 'moment'

Time.propTypes = {
    value: PropTypes.instanceOf(Date),
    format: PropTypes.string,
}

export function createTime(displayName, format) {
    return compose(
        setDisplayName(displayName),
        withProps({ format })
    )(Time)
}

export default function Time({ value = new Date(), format = 'hh:mm', children }) {
    const date = moment(value)

    return (
        <time dateTime={date.format()}>
            {children || date.format(format)}
        </time>
    )
}
