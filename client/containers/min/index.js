import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import * as min from 'api/urls/min'
import { sanitizeMountainInformationNetworkSubmission } from 'api/transformers'
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
            <Fetch cache={CACHE} url={min.report(id)}>
                {({ data, ...props }) =>
                    children(
                        Object.assign(props, {
                            data: data
                                ? sanitizeMountainInformationNetworkSubmission(
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

export const CACHE = new Memory()
