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
    children({ data, ...props }) {
        Object.assign(props, {
            data: data
                ? transformers
                      .sanitizeMountainInformationNetworkSubmissions(data)
                      .sort(sorter)
                : data,
        })

        return this.props.children(props)
    }
    renderError = () => {
        return (
            <Error>
                An error happened while retrieving Mountain Information
                Information reports for the last {this.props.days} days.
            </Error>
        )
    }
    render() {
        const request = min.reports(this.props.days)

        return (
            <ErrorBoundary fallback={this.renderError}>
                <Fetch cache={CACHE} request={request}>
                    {props => this.children(props)}
                </Fetch>
            </ErrorBoundary>
        )
    }
}

export const CACHE = new Memory()

// Utils
function sorter(a, b) {
    return a.datetime < b.datetime
}
