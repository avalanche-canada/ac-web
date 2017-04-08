import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, withHandlers} from 'recompose'
import {Link, withRouter} from 'react-router'
import {Page, Content, Header, Main, Section, Headline} from 'components/page'
import Forecast from 'components/forecast'
import {Status, Muted, Error, DateElement} from 'components/misc'
import Alert, {WARNING} from 'components/alert'
import {Metadata, Entry} from 'components/metadata'
import {DateIssued, ValidUntil, Forecaster} from 'components/forecast/Metadata'
import {DropdownFromOptions as Dropdown, DayPicker} from 'components/controls'
import {archiveForecast} from 'containers/connectors'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import startOfToday from 'date-fns/start_of_today'
import isBefore from 'date-fns/is_before'
import Url from 'url'
import endOfYesterday from 'date-fns/end_of_yesterday'

const AVCAN = 'avalanche-canada'
const PARKS_CANADA = 'parks-canada'
const CHIC_CHOCS = 'chics-chocs'
const VANCOUVER_ISLAND = 'vancouver-island'
const disabledDays = {
    after: endOfYesterday()
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
const AVALX = 'avalx'

function getWarningUrl(region, date) {
    const owner = region.get('owner')
    const type = region.get('type')
    const url = region.get('url')
    const externalUrl = region.get('externalUrl')

    switch (type) {
        case PARKS:
            const url = Url.parse(externalUrl, true)

            delete url.search

            Object.assign(url.query, {
                d: format(date, 'YYYY-MM-DD')
            })

            return Url.format(url)
        case LINK:
            return url.replace('http://avalanche.ca', '')
        default:
            throw new Error(`Type ${type} not supported yet.`)
    }
}

function Warning({region, date}) {
    return (
        <Link to={getWarningUrl(region, date)} target='_blank'>
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
    data: {
        title,
        region,
        forecast,
        isLoaded,
        isError,
        isLoading,
    },
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
                            <Dropdown options={regionOptions} value={name} onChange={onNameChange} disabled placeholder='Select a region' />
                        </Entry>
                        <Entry>
                            <DayPicker date={date} onChange={onDateChange} disabledDays={disabledDays}>
                                {date ? <DateElement value={date} /> : 'Select a date'}
                            </DayPicker>
                        </Entry>
                        {forecast && <DateIssued {...forecast} />}
                        {forecast && <ValidUntil {...forecast} />}
                        {forecast && <Forecaster {...forecast} />}
                    </Metadata>
                    {isLoading &&
                        <Muted>Loading archived forecast...</Muted>
                    }
                    {isError &&
                        <Error>Error happened while loading archived forecast.</Error>
                    }
                    {(isLoaded && !forecast) &&
                        <Warning region={region} date={date} />
                    }
                    {forecast && <Forecast {...forecast} />}
                </Main>
            </Content>
        </Page>
    )
}

export default compose(
    withRouter,
    archiveForecast,
    withHandlers({
        onNameChange: props => name => {
            props.onParamsChange({
                ...props.params,
                name,
            })
        },
        onDateChange: props => date => {
            props.onParamsChange({
                ...props.params,
                date: format(date, 'YYYY-MM-DD'),
            })
        },
    }),
    withProps(({params, regions}) => ({
        ...params,
        date: typeof params.date === 'string' ? parse(params.date, 'YYYY-MM-DD') : null,
        regionOptions: new Map(
            regions
                .filter(region => region.get('type') === 'avalx' || region.get('type') === 'parks')
                .map(region => [
                    region.get('id'),
                    region.get('name')
                ]).toArray()
        )
    })),
)(Component)
