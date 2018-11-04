import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as requests from 'api/requests/incidents'

export class Incident extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        const { id, children } = this.props

        return (
            <Fetch cache={CACHE} request={requests.incident(id)}>
                {children}
            </Fetch>
        )
    }
}

export class Incidents extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    render() {
        const { children, ...params } = this.props

        return (
            <Fetch cache={CACHE} request={requests.incidents(params)}>
                {children}
            </Fetch>
        )
    }
}

const CACHE = new Memory()
