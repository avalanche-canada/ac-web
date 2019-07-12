import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import { station, stations, measurements } from 'api/urls/weather'

Station.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Station({ id, children }) {
    return (
        <Fetch cache={STATIONS} url={station(id)}>
            {children}
        </Fetch>
    )
}

Stations.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Stations({ children }) {
    return (
        <Fetch cache={STATIONS} url={stations()}>
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
    return <Fetch url={measurements(id)}>{children}</Fetch>
}

const STATIONS = new Memory()
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
