import React, {PropTypes} from 'react'
import {compose, setDisplayName, withProps, mapProps, defaultProps} from 'recompose'
import moment from 'moment'

Time.propTypes = {
    value: PropTypes.instanceOf(Date),
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default function Time({value = new Date(), format, children}) {
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

export function createTime(displayName, defaultFormat) {
    return compose(
        setDisplayName(displayName),
        withProps(({format}) => ({
            format: format || defaultFormat
        })),
    )(Time)
}
