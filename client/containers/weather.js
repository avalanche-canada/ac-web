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

const NEW = [
    0,
    0,
    1,
    2,
    2,
    2,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    1,
    1,
    0,
    0,
    0,
    0,
]

export function Measurements({ id, children }) {
    function fakeMeasurements(props) {
        if (Array.isArray(props.data)) {
            let { snowHeight } = props.data[props.data.length - 1]
            const seven = new Date()
            seven.setHours(6)

            props.data = props.data
                .reverse()
                .filter(m => new Date(m.measurementDateTime) < seven)
                .map((measurements, index) => {
                    snowHeight = snowHeight + NEW[index % 24]

                    return {
                        ...measurements,
                        snowHeight,
                    }
                })
                .reverse()
        }

        return children(props)
    }

    return <Fetch request={measurements(id)}>{fakeMeasurements}</Fetch>
}

const STATIONS = new Memory()
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
