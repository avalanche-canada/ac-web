import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as requests from 'api/requests/mcr'

Report.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
}

export function Report({ id, children }) {
    // FIXME Could use payload from <Reports> to reduce requests
    return (
        <Fetch cache={CACHE} request={requests.report(id)}>
            {children}
        </Fetch>
    )
}

Reports.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Reports({ children }) {
    return (
        <Fetch cache={CACHE} request={requests.reports()}>
            {children}
        </Fetch>
    )
}

const CACHE = new Memory()
