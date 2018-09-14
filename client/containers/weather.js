import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as weather from 'api/requests/weather'

export class Station extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Fetch cache={STATIONS} request={weather.station(this.props.id)}>
                {this.props.children}
            </Fetch>
        )
    }
}

export class Stations extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Fetch cache={STATIONS} request={weather.stations()}>
                {this.props.children}
            </Fetch>
        )
    }
}

export class Measurements extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        return (
            <Fetch request={weather.measurements(this.props.id)}>
                {this.props.children}
            </Fetch>
        )
    }
}

const STATIONS = new Memory()
