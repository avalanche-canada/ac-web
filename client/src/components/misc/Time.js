import React, { PropTypes } from 'react'
import moment from 'moment'

DateElement.propTypes = {
    value: PropTypes.instanceOf(Date),
    format: PropTypes.string,
}

export default function DateElement({ value = new Date(), format = 'dddd MMMM Do' }) {
    return (
        <time>
            {moment(value).format(format)}
        </time>
    )
}
