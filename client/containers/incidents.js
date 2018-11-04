import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import { incident, incidents } from 'api/requests/incidents'

Incident.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Incident({ id, children }) {
    return (
        <Fetch cache={CACHE} request={incident(id)}>
            {children}
        </Fetch>
    )
}

Incidents.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Incidents({ children, ...params }) {
    return (
        <Fetch cache={CACHE} request={incidents(params)}>
            {children}
        </Fetch>
    )
}

const CACHE = new Memory()
