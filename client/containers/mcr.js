import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import * as mcr from 'api/requests/mcr'

export class Report extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Fetch request={mcr.report(this.props.id)}>
                {this.props.children}
            </Fetch>
        )
    }
}

export class Reports extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    render() {
        return <Fetch request={mcr.reports()}>{this.props.children}</Fetch>
    }
}
