import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as mcr from 'api/requests/mcr'

export class Report extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    children = ({ data, ...props }) => {
        const { id } = this.props

        Object.assign(props, {
            data: Array.isArray(data)
                ? data.find(report => report.id === id)
                : false,
        })

        return this.props.children(props)
    }
    render() {
        return <Reports>{this.children}</Reports>
    }
}

export class Reports extends Component {
    static CACHE = new Memory()
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Fetch cache={Reports.CACHE} request={mcr.reports()}>
                {this.props.children}
            </Fetch>
        )
    }
}
