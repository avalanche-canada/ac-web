import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import Time from './Time'

DateRange.propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    separator: PropTypes.string,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

function DateRange({ from, to, separator = ' to ', format }) {
    return (
        <Fragment>
            <Time value={from} format={format} />
            {separator}
            <Time value={to} format={format} />
        </Fragment>
    )
}

export default memo(DateRange)
