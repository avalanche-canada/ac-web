import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Time from './Time'

export default class DateRange extends PureComponent {
    static propTypes = {
        from: PropTypes.instanceOf(Date).isRequired,
        to: PropTypes.instanceOf(Date).isRequired,
        separator: PropTypes.string,
        format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }
    static defaultProps = {
        separator: ' to ',
    }
    render() {
        const { from, to, separator, format } = this.props

        return (
            <Fragment>
                <Time value={from} format={format} />
                {separator}
                <Time value={to} format={format} />
            </Fragment>
        )
    }
}
