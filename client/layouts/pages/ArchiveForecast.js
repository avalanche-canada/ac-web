import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Url from 'url'
import ForecastRegions from 'containers/ForecastRegions'
import Container from 'containers/Forecast'
import { Page, Content, Header, Main } from 'components/page'
import * as Components from 'layouts/products/forecast'
import * as Footer from 'layouts/products/forecast/Footer'
import { Muted } from 'components/text'
import { DateElement } from 'components/time'
import { Status } from 'components/misc'
import Alert, { WARNING } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import formatDate from 'date-fns/format'
import endOfYesterday from 'date-fns/end_of_yesterday'
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
    constructor(props) {
        super(props)

        this.disabledDays = {
            after: endOfYesterday(),
        }
    }
    componentWillReceiveProps({ name, date }) {
        if (name !== this.state.name || date !== this.state.date) {
            this.setState({
                name,
                date,
            })
        }
    }
    handleParamsChange = () => this.props.onParamsChange(this.state)
    handleNameChange = name => this.setState({ name }, this.handleParamsChange)
    handleDateChange = date => this.setState({ date }, this.handleParamsChange)
    regionsDropdown(regions) {
        return (
            <Dropdown
                options={new Map(regions.map(createRegionOption))}
                value={this.state.name}
                onChange={this.handleNameChange}
                disabled
                placeholder="Select a region"
            />
        )
    }
    renderWarning(region) {
        const to = getWarningUrl(region, this.props.date)

        return to ? (
            <Link to={to} target={region.get('id')}>
                <Alert type={WARNING}>{getWarningText(region)}</Alert>
            </Link>
        ) : null
    }
    forecast = ({ forecast, region, status }) => (
        <Components.Forecast value={forecast && forecast.toJSON()}>
            <Status {...status} />
            <Components.Metadata />
            <Components.ArchiveWarning date={this.props.date} />
            <Components.Headline />
            <Components.TabSet />
            <Components.Footer>
                <Footer.DangerRatings />
                <Footer.Disclaimer />
            </Components.Footer>
            {!forecast && status.isLoaded && region
                ? this.renderWarning(region)
                : null}
        </Components.Forecast>
    )
    get container() {
        const { name, date } = this.state

        if (!name) {
            return <Muted>Select a forecast region.</Muted>
        }

        if (!date) {
            return <Muted>Select a forecast date.</Muted>
        }

        return (
            <Container name={name} date={date}>
                {this.forecast}
            </Container>
        )
    }
    get metadata() {
        const { name, date } = this.state

        return (
            <Metadata>
                <Entry>
                    <ForecastRegions>
                        {regions => this.regionsDropdown(regions)}
                    </ForecastRegions>
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
function createRegionOption(region) {
    return [region.get('id'), region.get('name')]
}

function getWarningText(region) {
    const owner = region.get('owner')
    const name = region.get('name')

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

function getWarningUrl(region, date) {
    const type = region.get('type')
    const url = region.get('url')

    switch (type) {
        case 'parks': {
            const externalUrl = region.get('externalUrl')
            const url = Url.parse(externalUrl, true)

            delete url.search

            Object.assign(url.query, {
                d: formatDate(date, 'YYYY-MM-DD'),
            })

            return Url.format(url)
        }
        case 'link':
            return url.replace('http://avalanche.ca', '')
        default:
            return null
    }
}
