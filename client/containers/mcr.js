import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import { reports } from 'api/requests/mcr'

Report.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.func.isRequired,
}

export function Report({ id, children }) {
    return (
        <Reports>
            {({ data, ...props }) => {
                Object.assign(props, {
                    data: Array.isArray(data)
                        ? data.find(report => report.id === id)
                        : false,
                })

                return children(props)
            }}
        </Reports>
    )
}

Reports.propTypes = {
    children: PropTypes.func.isRequired,
}

export function Reports({ children }) {
    return (
        <Fetch cache={CACHE} request={reports()}>
            {children}
        </Fetch>
    )
}

const CACHE = new Memory()
