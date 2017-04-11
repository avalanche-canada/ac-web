import React from 'react'
import PropTypes from 'prop-types'
import {compose, withProps, withHandlers} from 'recompose'
import {Link, withRouter} from 'react-router'
import {Page, Content, Header, Main, Section, Headline} from '/components/page'
import HotZoneReport, {Metadata as HotZoneReportMetadata} from '/components/hotZoneReport'
import {Status, Muted, Error, DateElement} from '/components/misc'
import Alert, {WARNING} from '/components/alert'
import {Metadata, Entry} from '/components/metadata'
import {DropdownFromOptions as Dropdown, DayPicker} from '/components/controls'
import {archiveHotZoneReport} from '/containers/connectors'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import startOfToday from 'date-fns/start_of_today'
import isBefore from 'date-fns/is_before'
import isWithinRange from 'date-fns/is_within_range'

Component.propTypes = {
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    data: PropTypes.object,
    regionOptions: PropTypes.instanceOf(Map),
    onNameChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    dateRanges: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.instanceOf(Date).isRequired,
        end: PropTypes.instanceOf(Date).isRequired,
    })).isRequired,
}

// TODO: Combine with the Forecast component. This should not be that different component.

function Component({
    name,
    date,
    data: {
        title,
        report,
    },
    regionOptions,
    dateRanges = [],
    onNameChange,
    onDateChange,
}) {
    function handleDisabledDays(day) {
        return dateRanges.every(range => !isWithinRange(day, range.start, range.end))
    }

    return (
        <Page>
            <Header title={title || 'HotZone Archive'} />
            <Content>
                <Main>
                    <Metadata>
                        <Entry>
                            <Dropdown options={regionOptions} value={name} onChange={onNameChange} disabled placeholder='Select a region' />
                        </Entry>
                        <Entry>
                            <DayPicker date={date} onChange={onDateChange} disabledDays={handleDisabledDays}>
                                {date ? <DateElement value={date} /> : 'Select a date'}
                            </DayPicker>
                        </Entry>
                    </Metadata>
                    <HotZoneReportMetadata report={report} />
                    {report ?
                        <HotZoneReport report={report} /> :
                        (title && date) &&
                        <Muted>
                            No report available in {title} for <DateElement value={date} />.
                        </Muted>
                    }
                </Main>
            </Content>
        </Page>
    )
}

export default compose(
    withRouter,
    archiveHotZoneReport,
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
            regions.map(region => [
                region.get('id'),
                region.get('name')
            ]).toArray()
        )
    })),
)(Component)
