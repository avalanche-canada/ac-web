import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import { forecast } from 'api/requests/forecast'
import { transformForecast } from 'api/transformers'

Forecast.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    children: PropTypes.func.isRequired,
}

export function Forecast({ name, date, children }) {
    const request = forecast(name, date)

    return (
        <Fetch cache={CACHE} request={request}>
            {({ data, ...props }) =>
                children(
                    Object.assign(props, {
                        data: data ? transformForecast(data) : data,
                    })
                )
            }
        </Fetch>
    )
}

const CACHE = new Memory(15 * 60 * 1000)
