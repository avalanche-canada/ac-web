import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import endOfYesterday from 'date-fns/end_of_yesterday'
import { Forecast } from 'containers/forecast'
import { Region, Regions } from 'containers/features'
import { Page, Content, Header, Main } from 'components/page'
import * as components from 'layouts/products/forecast'
import * as Footer from 'layouts/products/forecast/Footer'
import Fetch from 'components/fetch'
import { Muted } from 'components/text'
import { DateElement } from 'components/time'
import Alert, { WARNING } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import {
    PARKS_CANADA,
    CHIC_CHOCS,
    VANCOUVER_ISLAND,
} from 'constants/forecast/owners'

export default class ArchiveForecast extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        onParamsChange: PropTypes.func.isRequired,
    }
    state = {
        name: this.props.name,
        date: this.props.date,
    }
    disabledDays = {
        after: endOfYesterday(),
    }
    componentWillReceiveProps({ name, date }) {
        if (name !== this.state.name || date !== this.state.date) {
            this.setState({ name, date })
        }
    }
    handleParamsChange = () => this.props.onParamsChange(this.state)
    handleNameChange = name => this.setState({ name }, this.handleParamsChange)
    handleDateChange = date => this.setState({ date }, this.handleParamsChange)
    regionsDropdown = ({ data }) => {
        return data ? (
            <Dropdown
                options={new Map(data.map(createRegionOption))}
                value={this.state.name}
                onChange={this.handleNameChange}
                disabled
                placeholder="Select a region"
            />
        ) : (
            'Loading...'
        )
    }
    renderWarning = ({ data }) => {
        if (!data) {
            return null
        }

        const to = getWarningUrl(data, this.props.date)

        return to ? (
            <a href={to} target={data.id}>
                <Alert type={WARNING}>{getWarningText(data)}</Alert>
            </a>
        ) : null
    }
    forecast({ data }) {
        const { name } = this.state

        return (
            <components.Forecast value={data}>
                <Fetch.Loading>
                    <Muted>Loading forecast...</Muted>
                </Fetch.Loading>
                <components.Metadata />
                <components.ArchiveWarning date={this.props.date} />
                <components.Headline />
                <components.TabSet />
                <components.Footer>
                    <Footer.DangerRatings />
                    <Footer.Disclaimer />
                </components.Footer>
                <Region name={name}>{this.renderWarning}</Region>
            </components.Forecast>
        )
    }
    get container() {
        const { name, date } = this.state

        if (!name) {
            return <Muted>Select a forecast region.</Muted>
        }

        if (!date) {
            return <Muted>Select a forecast date.</Muted>
        }

        return (
            <Forecast name={name} date={date}>
                {props => this.forecast(props)}
            </Forecast>
        )
    }
    get metadata() {
        const { name, date } = this.state

        return (
            <Metadata>
                <Entry>
                    <Regions>{this.regionsDropdown}</Regions>
                </Entry>
                {name && (
                    <Entry>
                        <DayPicker
                            date={date}
                            onChange={this.handleDateChange}
                            disabledDays={this.disabledDays}>
                            {date ? (
                                <DateElement value={date} />
                            ) : (
                                'Select a date'
                            )}
                        </DayPicker>
                    </Entry>
                )}
            </Metadata>
        )
    }
    render() {
        return (
            <Page>
                <Header title="Forecast Archive" />
                <Content>
                    <Main>
                        {this.metadata}
                        {this.container}
                    </Main>
                </Content>
            </Page>
        )
    }
}

// Utils
function createRegionOption({ id, name }) {
    return [id, name]
}

function getWarningText({ name, owner }) {
    switch (owner) {
        case PARKS_CANADA:
            return `Archived forecast bulletins for ${name} region are available on the Parks Canada - Public Avalanche Information website`
        case CHIC_CHOCS:
        case VANCOUVER_ISLAND:
            return `You can get more information for ${name} region on their website`
        default:
            return null
    }
}

function getWarningUrl({ type, url, externalUrl }, date) {
    switch (type) {
        case 'parks': {
            const [path, search] = externalUrl.split('?')
            const params = new URLSearchParams(search)

            params.set('d', formatDate(date, 'YYYY-MM-DD'))

            return [path, params.toString()].join('?')
        }
        case 'link':
            return url.replace('http://avalanche.ca', '')
        default:
            return null
    }
}
