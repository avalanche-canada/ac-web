import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WeatherForecast as Container } from 'prismic/containers'
import formatDate from 'date-fns/format'
import Component from 'components/weather'
import { Status } from 'components/misc'

export default class WeatherForecast extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    get date() {
        const { date } = this.props.match.params

        return date ? formatDate(date) : undefined
    }
    children({ status, forecast }) {
        return [
            <Status {...status} />,
            forecast ? <Component forecast={forecast} /> : null,
        ].filter(Boolean)
    }
    render() {
        return <Container date={this.date}>{this.children}</Container>
    }
}
