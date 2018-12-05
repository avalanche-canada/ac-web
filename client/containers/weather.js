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
            const [{ snowHeight: initialSnowHeight }] = props.data
            const seven = new Date()
            seven.setHours(6)

            props.data = props.data
                .filter(m => new Date(m.measurementDateTime) < seven)
                .map(({ snowHeight, ...measurements }) =>
                    Object.assign(measurements, {
                        snowHeight: snowHeight - (initialSnowHeight % 15),
                    })
                )
        }

        return children(props)
    }

    return <Fetch request={measurements(id)}>{fakeMeasurements}</Fetch>
}

const STATIONS = new Memory()
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
