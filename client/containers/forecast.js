import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import { forecast } from 'api/requests/forecast'
import * as transformers from 'api/transformers'

export class Forecast extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        children: PropTypes.func.isRequired,
    }
    static CACHE = new Memory(15 * 60 * 1000)
    children({ data, ...props }) {
        Object.assign(props, {
            data: data ? transformers.transformForecast(data) : data,
        })

        return this.props.children(props)
    }
    render() {
        const { name, date } = this.props
        const request = forecast(name, date)

        return (
            <Fetch cache={Forecast.CACHE} request={request}>
                {props => this.children(props)}
            </Fetch>
        )
    }
}
