import React from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'
import endOfYesterday from 'date-fns/end_of_yesterday'
import { useForecast } from 'hooks/async/forecast'
import {
    useForecastRegionsMetadata,
    useForecastRegionMetadata,
} from 'hooks/async/features'
import { Page, Content, Header, Main } from 'components/page'
import * as components from 'layouts/products/forecast'
import * as Footer from 'layouts/products/forecast/Footer'
import { Muted, Loading } from 'components/text'
import { Warning } from 'components/alert'
import { Metadata, Entry } from 'components/metadata'
import Shim from 'components/Shim'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import externals from 'router/externals'
import {
    PARKS_CANADA,
    CHIC_CHOCS,
    VANCOUVER_ISLAND,
} from 'constants/forecast/owners'
import { handleForecastTabActivate } from 'services/analytics'

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
                                value={name}
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
                    <ForecastSwitch name={name} date={date} />
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function RegionDropdown({ value, onChange }) {
    const [regions, pending] = useForecastRegionsMetadata()

    return pending ? (
        'Loading...'
    ) : (
        <Dropdown
            options={new Map(regions.map(createRegionOption))}
            value={value}
            onChange={onChange}
            disabled
            placeholder="Select a region"
        />
    )
}
function ForecastSwitch(props) {
    const { name, date } = props
    const [region] = useForecastRegionMetadata(name)

    if (!name) {
        return <Muted>Select a forecast region.</Muted>
    }

    if (!date) {
        return <Muted>Select a forecast date.</Muted>
    }

    const warning =
        region && getWarningUrl(region, date) ? (
            <Shim vertical>
                <a href={getWarningUrl(region, date)} target={region.id}>
                    <Warning>{getWarningText(region)}</Warning>
                </a>
            </Shim>
        ) : null

    if (externals.has(name)) {
        return warning
    }

    return <ForecastContent {...props}>{warning}</ForecastContent>
}
function ForecastContent({ name, date, children }) {
    const [forecast, pending] = useForecast(name, date)

    return (
        <components.Provider value={forecast}>
            {pending && <Loading>Loading forecast...</Loading>}
            <components.Metadata />
            <Shim vertical>
                <components.ArchiveWarning date={date} />
            </Shim>
            <components.Headline />
            <components.TabSet onTabChange={handleForecastTabActivate} />
            <components.Footer>
                <Footer.DangerRatings />
                <Footer.Disclaimer />
            </components.Footer>
            {children}
        </components.Provider>
    )
}
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
