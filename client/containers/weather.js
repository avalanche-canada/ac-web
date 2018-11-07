import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import { station, stations, measurements } from 'api/requests/weather'

Station.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Station({ id, children }) {
    return (
        <Fetch cache={STATIONS} request={station(id)}>
            {children}
        </Fetch>
    )
}

Stations.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Stations({ children }) {
    return (
        <Fetch cache={STATIONS} request={stations()}>
            {({ data, ...props }) =>
                children(
                    Object.assign(props, {
                        data: Array.isArray(data) ? data.sort(sorter) : data,
                    })
                )
            }
        </Fetch>
    )
}

Measurements.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Measurements({ id, children }) {
    function fakeMeasurements(props) {
        if (Array.isArray(props.data)) {
            let { snowHeight: initialSnowHeight } = props.data[
                props.data.length - 1
            ]

            if (!initialSnowHeight) {
                initialSnowHeight = 55
            }

            props.data = props.data.map(measurements => {
                let {
                    snowHeight,
                    airTempAvg,
                    measurementDateTime,
                } = measurements

                measurementDateTime = new Date(measurementDateTime)

                measurementDateTime.setMonth(measurementDateTime.getMonth() - 9)

                return {
                    ...measurements,
                    snowHeight:
                        initialSnowHeight +
                        (snowHeight || 1) +
                        Math.random() * 10,
                    airTempAvg: -1 * Math.abs(airTempAvg) - 5,
                    measurementDateTime: measurementDateTime.toISOString(),
                }
            })
        }

        return children(props)
    }

    return <Fetch request={measurements(id)}>{fakeMeasurements}</Fetch>
}

const STATIONS = new Memory()
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
