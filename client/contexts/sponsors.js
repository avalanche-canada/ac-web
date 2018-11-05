import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import { resource } from 'api/requests/static'
import { status } from 'services/fetch/utils'
import { LocalStorage } from 'services/storage'
import { captureException } from 'services/sentry'

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element,
    }
    storage = LocalStorage.create()
    state = this.storage.get('sponsors', {
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
    })
    async fetch() {
        try {
            const response = await fetch(resource('sponsors'))
            const data = await status(response)
            const date = formatDate(new Date(), 'YYYY-MM-DD')
            const sponsors = Object.assign({}, data.default, data[date])

            this.setState(sponsors, () => {
                this.storage.set('sponsors', sponsors)
            })
        } catch (error) {
            captureException(error)
        }
    }
    componentDidMount() {
        // TODO Could also use requestIdleCallback
        this.timeoutId = setTimeout(this.fetch.bind(this), 9999)
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }
    render() {
        return (
            <SponsorsContext.Provider value={this.state}>
                {this.props.children}
            </SponsorsContext.Provider>
        )
    }
}

const SponsorsContext = createContext()

export default SponsorsContext
