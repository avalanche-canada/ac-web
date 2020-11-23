import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import eachDay from 'date-fns/each_day'
import { Content, Header, Main } from 'components/page'
import { Page } from 'layouts/pages'
import { Muted } from 'components/text'
import { Loading } from 'components/text'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import { Report } from 'layouts/products/advisory'
import { hotZone } from 'prismic/params'
import { useDocuments, useDocument } from 'prismic/hooks'
import { DateParam } from 'hooks/params'
import * as urls from 'utils/url'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFormatDate } from 'hooks/intl'

ArchiveAdvisory.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
}

export default function ArchiveAdvisory(props) {
    const title = (
        <FormattedMessage
            description="Layout pages/ArchiveAdvisory"
            defaultMessage="Avalanche Advisory Archive"
        />
    )
    const placeholder = (
        <FormattedMessage
            description="Layout pages/ArchiveAdvisory"
            defaultMessage="Select an area"
        />
    )
    const [{ name, date, month }, setState] = useState({
        ...props,
        month: props.date || new Date(),
    })
    function handleNameChange(name) {
        setState(state => ({ ...state, name }))
        navigateToAdvisory(name, date)
    }
    function handleDateChange(date) {
        setState(state => ({ ...state, date }))
        navigateToAdvisory(name, date)
    }
    function handleMonthChange(month) {
        setState(state => ({ ...state, month }))
    }

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <Dropdown
                                options={AREAS}
                                value={name}
                                onChange={handleNameChange}
                                disabled
                                placeholder={placeholder}
                            />
                        </Entry>
                        {name && (
                            <Entry>
                                <AdvisoryDayPicker
                                    name={name}
                                    date={date}
                                    month={month}
                                    onDateChange={handleDateChange}
                                    onMonthChange={handleMonthChange}
                                />
                            </Entry>
                        )}
                    </Metadata>
                    <ArchiveContent name={name} date={date} />
                </Main>
            </Content>
        </Page>
    )
}

// Utils
function AdvisoryDayPicker({ name, date, month, onDateChange, onMonthChange }) {
    const intl = useIntl()
    const [documents = []] = useDocuments(hotZone.reports.monthly(name, month))
    const days = documents.reduce(monthReducer, new Set())
    const placeholder = intl.formatMessage({
        description: 'Layout pages/ArchiveAdvisory',
        defaultMessage: 'Select a date',
    })

    return (
        <DayPicker
            date={date}
            placeholder={placeholder}
            onChange={onDateChange}
            onMonthChange={onMonthChange}
            disabledDays={day => !days.has(startOfDay(day).getTime())}
        />
    )
}
function navigateToAdvisory(name, date) {
    navigate(urls.path('/advisories/archives', name, DateParam.format(date)))
}
function monthReducer(days, { data }) {
    const start = startOfDay(data.dateOfIssue)
    const end = endOfDay(data.validUntil)

    for (let day of eachDay(start, end)) {
        days.add(startOfDay(day).getTime())
    }

    return days
}
// FIXME Hardcoding areas for now. Need a better way to get historical data.
const AREAS = new Map([
    ['hankin-evelyn', 'Hankin-Evelyn'],
    ['kakwa', 'Kakwa'],
    ['renshaw', 'Renshaw'],
    ['telkwa', 'Telkwa'],
    ['yukon', 'Yukon'],
])
function ArchiveContent({ name, date }) {
    if (!name) {
        return (
            <Muted>
                <FormattedMessage
                    description="Layout pages/ArchiveAdvisory"
                    defaultMessage="Select an area."
                />
            </Muted>
        )
    }

    if (!date) {
        return (
            <Muted>
                <FormattedMessage
                    description="Layout pages/ArchiveAdvisory"
                    defaultMessage="Select a date for the {name} area."
                    values={{ name }}
                />
            </Muted>
        )
    }

    return <Advisory name={name} date={date} />
}
function Advisory({ name, date }) {
    const [document, pending] = useDocument(hotZone.report(name, date))
    const values = {
        name,
        date: useFormatDate(date),
    }

    return pending ? (
        <Loading />
    ) : document ? (
        <Report value={document} />
    ) : (
        <Muted>
            <FormattedMessage
                description="Layout pages/ArchiveAdvisory"
                defaultMessage="No advisory available in {name} for {date}."
                values={values}
            />
        </Muted>
    )
}
