import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { resource } from 'api/requests/static'
import { status } from 'services/fetch/utils'
import formatDate from 'date-fns/format'

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element,
    }
    state = {
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
        // TODO Could also use requestIdleCallback
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

const Context = createContext()

export default Context.Consumer
