import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { useMemo } from 'react'
import { Memory } from 'components/fetch/Cache'
import { forecast } from 'api/urls/forecast'
import { transformForecast } from 'api/transformers'
import { useFetch } from 'utils/react/hooks'

export function useForecast(name, date) {
    const [data, pending] = useFetch(forecast(name, date), CACHE)

    return [useMemo(transformForecast, [data]), pending]
}

Forecast.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    children: PropTypes.func.isRequired,
}

// TODO Remove once consumer are converted to functional components
// TODO Create fetching context components <Pending>, <Fullfilled>, <Found> and <NotFound> they are basically condiotional rendering components
// export function Forecast({ name, date, children }) {
//     const [data, pending] = useForecast(name, date)

//     return children({ data, pending })
// }
export function Forecast({ name, date, children }) {
    return (
        <Fetch cache={CACHE} url={forecast(name, date)}>
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
