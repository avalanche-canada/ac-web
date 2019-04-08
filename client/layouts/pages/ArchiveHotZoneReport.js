import React, { useReducer, Fragment } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { HotZones } from 'containers/features'
import { Report } from 'layouts/products/hzr'
import { Page, Content, Header, Main } from 'components/page'
import { Muted } from 'components/text'
import { Loading } from 'components/text'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import formatDate from 'date-fns/format'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import eachDay from 'date-fns/each_day'
import { Document, Documents } from 'prismic/containers'
import { hotZone } from 'prismic/params'
import { DATE } from 'utils/date'

ArchiveHotZoneReport.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
}

export default function ArchiveHotZoneReport(props) {
    const [{ name, date, month }, setState] = useReducer(
        reducer,
        Object.assign({}, props, {
            month: props.date || new Date(),
        })
    )
    function handleNameChange(name) {
        setState({ name })
        navigateToAdvisory(name, date)
    }
    function handleDateChange(date) {
        setState({ date })
        navigateToAdvisory(name, date)
    }
    function handleMonthChange(month) {
        setState({ month })
    }

    return (
        <Page>
            <Header title="Avalanche Advisory Archive" />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <HotZonesDropdown
                                value={name}
                                onChange={handleNameChange}
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
    return (
        <Documents {...hotZone.reports.monthly(name, month)}>
            {({ documents = [] }) => {
                const days = documents.reduce(monthReducer, new Set())

                return (
                    <DayPicker
                        date={date}
                        placeholder="Select a date"
                        onChange={onDateChange}
                        onMonthChange={onMonthChange}
                        disabledDays={day =>
                            !days.has(startOfDay(day).getTime())
                        }
                    />
                )
            }}
        </Documents>
    )
}
function navigateToAdvisory(name, date) {
    const paths = [
        '/advisories',
        'archives',
        name,
        date && formatDate(date, 'YYYY-MM-DD'),
    ]

    navigate(paths.filter(Boolean).join('/'))
}
function reducer(state, action) {
    return Object.assign({}, state, action)
}
function monthReducer(days, { data }) {
    const start = startOfDay(data.dateOfIssue)
    const end = endOfDay(data.validUntil)

    for (let day of eachDay(start, end)) {
        days.add(startOfDay(day).getTime())
    }

    return days
}
function HotZonesDropdown({ value, onChange }) {
    return (
        <HotZones all>
            {({ data }) =>
                data ? (
                    <Dropdown
                        options={new Map(data.map(createZoneOption))}
                        value={value}
                        onChange={onChange}
                        disabled
                        placeholder="Select an area"
                    />
                ) : (
                    'Loading...'
                )
            }
        </HotZones>
    )
}
function ArchiveContent({ name, date }) {
    if (!name) {
        return <Muted>Select an area.</Muted>
    }

    if (!date) {
        return <Muted>Select a date for the {name} area.</Muted>
    }

    if (name && date) {
        return (
            <Document {...hotZone.report(name, date)}>
                {({ document, loading }) => (
                    <Fragment>
                        {loading ? (
                            <Loading />
                        ) : document ? null : (
                            <Muted>
                                {`No advisory available in ${name} for ${formatDate(
                                    date,
                                    DATE
                                )}.`}
                            </Muted>
                        )}
                        <Report value={document} />
                    </Fragment>
                )}
            </Document>
        )
    }
}
function createZoneOption({ id, name }) {
    return [id, name]
}
