import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { resource } from 'api/requests/static'
import { status } from 'services/fetch/utils'
import formatDate from 'date-fns/format'

const STATE = {
    About: 'rmr',
    BlogIndex: 'toyotastacked',
    BlogPage: 'mec',
    EventIndex: 'varda',
    EventPage: 'scarpa',
    Forecast: 'acf',
    Gear: 'toyotastacked',
    MIN: 'rmr',
    NewsIndex: 'northface',
    NewsPage: 'marmot',
    Training: 'revelstoke-tourism',
    Weather: 'toyotastacked',
    Youth: 'cbt',
}

const Context = createContext(STATE)

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element,
    }
    state = STATE
    async fetch() {
        const response = await fetch(resource('sponsors'))
        const sponsors = await status(response)
        const date = formatDate(new Date(), 'YYYY-MM-DD')

        this.setState(Object.assign({}, sponsors.default, sponsors[date]))
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }
    componentDidMount() {
        // TODO: Investigate if we could use requestIdleCallback, but support is not support good yet.
        this.timeoutId = setTimeout(this.fetch.bind(this), 9999)
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default class SponsorsMetadata extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    render() {
        return <Context.Consumer>{this.props.children}</Context.Consumer>
    }
}
