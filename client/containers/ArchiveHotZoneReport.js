import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose, withProps, withHandlers } from 'recompose'
import { Page, Content, Header, Main } from 'components/page'
import HotZoneReport, {
    Metadata as HotZoneReportMetadata,
} from 'components/hotZoneReport'
import { DateElement } from 'components/time'
import { Muted } from 'components/text'
import { Metadata, Entry } from 'components/metadata'
import {
    DropdownFromOptions as Dropdown,
    DayPicker,
} from 'components/controls'
import { archiveHotZoneReport } from 'containers/connectors'
import parseDate from 'date-fns/parse'
import formatDate from 'date-fns/format'
import isWithinRange from 'date-fns/is_within_range'

Component.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    data: PropTypes.object,
    regionOptions: PropTypes.instanceOf(Map),
    onNameChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    dateRanges: PropTypes.arrayOf(
        PropTypes.shape({
            start: PropTypes.instanceOf(Date).isRequired,
            end: PropTypes.instanceOf(Date).isRequired,
        })
    ).isRequired,
}

// TODO: Combine with the Forecast component.
// This should not be that different component.

function Component({
    name,
    date,
    data: { title, report },
    regionOptions,
    dateRanges = [],
    onNameChange,
    onDateChange,
}) {
    function handleDisabledDays(day) {
        return dateRanges.every(
            range => !isWithinRange(day, range.start, range.end)
        )
    }

    return (
        <Page>
            <Header title={title || 'HotZone Archive'} />
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
                                disabledDays={handleDisabledDays}>
                                {date
                                    ? <DateElement value={date} />
                                    : 'Select a date'}
                            </DayPicker>
                        </Entry>
                    </Metadata>
                    <HotZoneReportMetadata report={report} />
                    {report
                        ? <HotZoneReport report={report} />
                        : title &&
                          date &&
                          <Muted>
                              No report available in {title} for{' '}
                              <DateElement value={date} />
                              .
                          </Muted>}
                </Main>
            </Content>
        </Page>
    )
}

function push(history, name, date) {
    const paths = ['/hot-zone-reports', 'archives']

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
    archiveHotZoneReport,
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
                .map(region => [region.get('id'), region.get('name')])
                .toArray()
        ),
    }))
)(Component)
