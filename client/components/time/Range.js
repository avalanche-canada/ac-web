import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Time from './Time'
import { FormattedMessage } from 'react-intl'

DateRange.propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default function DateRange({ from, to, format }) {
    return (
        <Fragment>
            <Time value={from} format={format} />
            <FormattedMessage
                description="Component time/DateRange"
                defaultMessage=" to "
            />
            <Time value={to} format={format} />
        </Fragment>
    )
}
