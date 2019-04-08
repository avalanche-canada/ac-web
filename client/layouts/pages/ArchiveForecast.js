import React from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import endOfYesterday from 'date-fns/end_of_yesterday'
import { Forecast } from 'containers/forecast'
import { Region, Regions } from 'containers/features'
import { Page, Content, Header, Main } from 'components/page'
import * as components from 'layouts/products/forecast'
import * as Footer from 'layouts/products/forecast/Footer'
import { Pending } from 'components/fetch'
import { Muted, Loading } from 'components/text'
import Alert, { WARNING } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import externals from 'router/externals'
import {
    PARKS_CANADA,
    CHIC_CHOCS,
    VANCOUVER_ISLAND,
    AVALANCHE_CANADA,
} from 'constants/forecast/owners'
import { handleForecastTabActivate } from 'services/analytics'

// TODO: Could use <Router> to display warning intead of if statments

ArchiveForecast.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    onParamsChange: PropTypes.func.isRequired,
}

export default function ArchiveForecast({ name, date, onParamsChange }) {
    function handleNameChange(name) {
        onParamsChange({ date, name })
    }
    function handleDateChange(date) {
        onParamsChange({ name, date })
    }

    return (
        <Page>
            <Header title="Forecast Archive" />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <RegionDropdown
                                name={name}
                                onChange={handleNameChange}
                            />
                        </Entry>
                        {name && (
                            <Entry>
                                <DayPicker
                                    date={date}
                                    placeholder="Select a date"
                                    onChange={handleDateChange}
                                    disabledDays={{
                                        after: endOfYesterday(),
                                    }}
                                />
                            </Entry>
                        )}
                    </Metadata>
                    <ForecastContent name={name} date={date} />
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function RegionDropdown({ value, onChange }) {
    return (
        <Regions>
            {({ data }) =>
                data ? (
                    <Dropdown
                        options={new Map(data.map(createRegionOption))}
                        value={value}
                        onChange={onChange}
                        disabled
                        placeholder="Select a region"
                    />
                ) : (
                    'Loading...'
                )
            }
        </Regions>
    )
}
function ForecastContent({ name, date }) {
    function renderWarning({ data }) {
        if (!data) {
            return null
        }

        const to = getWarningUrl(data, date)

        return to ? (
            <a href={to} target={data.id}>
                <Alert type={WARNING}>{getWarningText(data)}</Alert>
            </a>
        ) : null
    }
    if (!name) {
        return <Muted>Select a forecast region.</Muted>
    }

    if (!date) {
        return <Muted>Select a forecast date.</Muted>
    }

    return externals.has(name) || name === NORTH_ROCKIES ? (
        <Region name={name}>{renderWarning}</Region>
    ) : (
        <Forecast name={name} date={date}>
            {({ data }) => (
                <components.Forecast value={data}>
                    <Pending>
                        <Loading>Loading forecast...</Loading>
                    </Pending>
                    <components.Metadata />
                    <components.ArchiveWarning date={date} />
                    <components.Headline />
                    <components.TabSet
                        onTabChange={handleForecastTabActivate}
                    />
                    <components.Footer>
                        <Footer.DangerRatings />
                        <Footer.Disclaimer />
                    </components.Footer>
                    <Region name={name}>{renderWarning}</Region>
                </components.Forecast>
            )}
        </Forecast>
    )
}
function createRegionOption({ id, name }) {
    return [id, name]
}
function getWarningText({ name, owner, id }) {
    switch (owner) {
        case PARKS_CANADA:
            return `Archived forecast bulletins for ${name} region are available on the Parks Canada - Public Avalanche Information website`
        case CHIC_CHOCS:
        case VANCOUVER_ISLAND:
            return `You can get more information for ${name} region on their website`
        case AVALANCHE_CANADA:
            return id === NORTH_ROCKIES
                ? 'North Rockies are available as blog posts'
                : null
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

const NORTH_ROCKIES = 'north-rockies'
