import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withHandlers } from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import { Page, Content, Header, Main } from '~/components/page'
import Forecast from '~/components/forecast'
import { DateElement } from '~/components/time'
import { Muted, Error } from '~/components/text'
import Alert, { WARNING } from '~/components/alert'
import { Metadata, Entry } from '~/components/metadata'
import {
    DateIssued,
    ValidUntil,
    Forecaster,
} from '~/components/forecast/Metadata'
import {
    DropdownFromOptions as Dropdown,
    DayPicker,
} from '~/components/controls'
import { archiveForecast } from '~/containers/connectors'
import parseDate from 'date-fns/parse'
import formatDate from 'date-fns/format'
import endOfYesterday from 'date-fns/end_of_yesterday'
import Url from 'url'

// TODO: Move these to constants with appropriate function
const PARKS_CANADA = 'parks-canada'
const CHIC_CHOCS = 'chics-chocs'
const VANCOUVER_ISLAND = 'vancouver-island'
const disabledDays = {
    after: endOfYesterday(),
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
            throw new Error(`Owner ${owner} not supported yet.`)
    }
}

const PARKS = 'parks'
const LINK = 'link'

function getWarningUrl(region, date) {
    const type = region.get('type')
    const url = region.get('url')

    switch (type) {
        case PARKS: {
            const externalUrl = region.get('externalUrl')
            const url = Url.parse(externalUrl, true)

            delete url.search

            Object.assign(url.query, {
                d: formatDate(date, 'YYYY-MM-DD'),
            })

            return Url.format(url)
        }
        case LINK:
            return url.replace('http://avalanche.ca', '')
        default:
            throw new Error(`Type ${type} not supported yet.`)
    }
}

Warning.propTypes = {
    region: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

function Warning({ region, date }) {
    return (
        <Link to={getWarningUrl(region, date)} target="_blank">
            <Alert type={WARNING}>
                {getWarningText(region)}
            </Alert>
        </Link>
    )
}

Component.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    data: PropTypes.object,
    regionOptions: PropTypes.instanceOf(Map),
    onNameChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
}

// TODO: Combine with the Forecast component. This should not be a different component.

function Component({
    name,
    date,
    data: { title, region, forecast, isLoaded, isError, isLoading },
    regionOptions,
    onNameChange,
    onDateChange,
}) {
    // TODO: Region list sould be filterable
    return (
        <Page>
            <Header title={title || 'Forecast Archive'} />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <Dropdown
                                options={regionOptions}
                                value={name}
                                onChange={onNameChange}
                                disabled
                                placeholder="Select a region"
                            />
                        </Entry>
                        <Entry>
                            <DayPicker
                                date={date}
                                onChange={onDateChange}
                                disabledDays={disabledDays}>
                                {date
                                    ? <DateElement value={date} />
                                    : 'Select a date'}
                            </DayPicker>
                        </Entry>
                        {forecast && <DateIssued {...forecast} />}
                        {forecast && <ValidUntil {...forecast} />}
                        {forecast && <Forecaster {...forecast} />}
                    </Metadata>
                    {isLoading && <Muted>Loading archived forecast...</Muted>}
                    {isError &&
                        <Error>
                            Error happened while loading archived forecast.
                        </Error>}
                    {isLoaded &&
                        !forecast &&
                        <Warning region={region} date={date} />}
                    {forecast && <Forecast {...forecast} />}
                </Main>
            </Content>
        </Page>
    )
}

function push(history, name, date) {
    const paths = ['/forecasts', 'archives']

    if (name) {
        paths.push(name)
    }

    if (date) {
        paths.push(formatDate(date, 'YYYY-MM-DD'))
    }

    history.push(paths.join('/'))
}

export default compose(
    withRouter,
    archiveForecast,
    withHandlers({
        onNameChange: props => name => {
            push(props.history, name, props.date)
        },
        onDateChange: props => date => {
            push(props.history, props.name, date)
        },
    }),
    withProps(({ date, regions }) => ({
        date: typeof date === 'string' ? parseDate(date, 'YYYY-MM-DD') : null,
        regionOptions: new Map(
            regions
                .filter(
                    region =>
                        region.get('type') === 'avalx' ||
                        region.get('type') === 'parks'
                )
                .map(region => [region.get('id'), region.get('name')])
                .toArray()
        ),
    }))
)(Component)
