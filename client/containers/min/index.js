import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import * as min from 'api/requests/min'
import * as transformers from 'api/transformers'
import { Error } from 'components/text'

Report.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Report({ id, children }) {
    // TODO Move error handling outside this component
    const fallback = (
        <Error>
            An error happened while retrieving Mountain Information Information
            report.
        </Error>
    )

    return (
        <ErrorBoundary fallback={fallback}>
            <Fetch cache={CACHE} request={min.report(id)}>
                {({ data, ...props }) =>
                    children(
                        Object.assign(props, {
                            data: data
                                ? transformers.sanitizeMountainInformationNetworkSubmission(
                                      data
                                  )
                                : data,
                        })
                    )
                }
            </Fetch>
        </ErrorBoundary>
    )
}

Reports.propTypes = {
    days: PropTypes.number,
    children: PropTypes.func.isRequired,
}

export function Reports({ days = 7, children }) {
    const request = min.reports(days)

    return (
        <Fetch cache={CACHE} request={request}>
            {({ data, ...props }) =>
                children(
                    Object.assign(props, {
                        data: data ? createReports(data) : data,
                    })
                )
            }
        </Fetch>
    )
}

export const CACHE = new Memory()

// Utils
function sorter(a, b) {
    return a.datetime < b.datetime
}
const createReports = memoize(reports =>
    transformers
        .sanitizeMountainInformationNetworkSubmissions(reports)
        .sort(sorter)
)
