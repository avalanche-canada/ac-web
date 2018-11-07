import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import ErrorBoundary from 'components/ErrorBoundary'
import * as min from 'api/requests/min'
import * as transformers from 'api/transformers'
import { Error } from 'components/text'

export class Report extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    children({ data, ...props }) {
        Object.assign(props, {
            data: data
                ? transformers.sanitizeMountainInformationNetworkSubmission(
                      data
                  )
                : data,
        })

        return this.props.children(props)
    }
    renderError() {
        return (
            <Error>
                An error happened while retrieving Mountain Information
                Information report.
            </Error>
        )
    }
    render() {
        const request = min.report(this.props.id)

        return (
            <ErrorBoundary fallback={this.renderError}>
                <Fetch cache={CACHE} request={request}>
                    {props => this.children(props)}
                </Fetch>
            </ErrorBoundary>
        )
    }
}

export class Reports extends Component {
    static propTypes = {
        days: PropTypes.number,
        children: PropTypes.func.isRequired,
    }
    static defaultProps = {
        days: 7,
    }
    children(reports, report) {
        return this.props.children({
            data: transformers
                .sanitizeMountainInformationNetworkSubmissions(
                    [...(reports?.data || []), report.data].filter(Boolean)
                )
                .sort(sorter),
        })
    }
    render() {
        return (
            <Fetch cache={CACHE} request={min.reports(this.props.days)}>
                {reports => (
                    <Fetch cache={CACHE} request={min.report(BIJOUX)}>
                        {report => this.children(reports, report)}
                    </Fetch>
                )}
            </Fetch>
        )
    }
}

export const CACHE = new Memory()

// Utils
function sorter(a, b) {
    return a.datetime < b.datetime
}
const BIJOUX = 'd0c724d5-224a-4c58-b5d6-b01736ba8cb9'
