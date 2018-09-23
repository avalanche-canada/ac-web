import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { HotZones } from 'containers/features'
import { Report } from 'layouts/products/hzr'
import { Page, Content, Header, Main } from 'components/page'
import { DateElement } from 'components/time'
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

export default class ArchiveHotZoneReport extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        date: PropTypes.instanceOf(Date),
    }
    state = {
        name: this.props.name,
        date: this.props.date,
        month: this.props.date || new Date(),
    }
    navigate = () => {
        const { name, date } = this.state
        const paths = [
            '/hot-zone-reports',
            'archives',
            name,
            date && formatDate(date, 'YYYY-MM-DD'),
        ]

        navigate(paths.filter(Boolean).join('/'))
    }
    handleNameChange = name => {
        this.setState({ name }, this.navigate)
    }
    handleDateChange = date => {
        this.setState({ date }, this.navigate)
    }
    handleMonthChange = month => this.setState({ month })
    zonesDropdown = ({ data }) =>
        data ? (
            <Dropdown
                options={new Map(data.map(createZoneOption))}
                value={this.state.name}
                onChange={this.handleNameChange}
                disabled
                placeholder="Select a hot zone"
            />
        ) : null
    dayPicker = ({ documents = [] }) => {
        const { date } = this.state
        const days = documents.reduce((days, { data }) => {
            const start = startOfDay(data.dateOfIssue)
            const end = endOfDay(data.validUntil)

            for (let day of eachDay(start, end)) {
                days.add(startOfDay(day).getTime())
            }

            return days
        }, new Set())

        return (
            <DayPicker
                date={date}
                onChange={this.handleDateChange}
                onMonthChange={this.handleMonthChange}
                disabledDays={day => !days.has(startOfDay(day).getTime())}>
                {date ? <DateElement value={date} /> : 'Select a date'}
            </DayPicker>
        )
    }
    get metadata() {
        const { name, month } = this.state

        return (
            <Metadata>
                <Entry>
                    <HotZones all>{this.zonesDropdown}</HotZones>
                </Entry>
                {name && (
                    <Entry>
                        <Documents {...hotZone.reports.monthly(name, month)}>
                            {this.dayPicker}
                        </Documents>
                    </Entry>
                )}
            </Metadata>
        )
    }
    children = ({ document, loading }) => {
        const { name, date } = this.state

        return (
            <Fragment>
                {loading ? (
                    <Loading />
                ) : document ? null : (
                    <Muted>
                        {`No report available in ${name} for ${formatDate(
                            date,
                            DATE
                        )}.`}
                    </Muted>
                )}
                <Report value={document} />
            </Fragment>
        )
    }
    get container() {
        const { name, date } = this.state

        if (name && date) {
            return (
                <Document {...hotZone.report(name, date)}>
                    {this.children}
                </Document>
            )
        }

        if (!name) {
            return <Muted>Select a hot zone.</Muted>
        }

        if (!date) {
            return <Muted>Select a date for the {name} hot zone.</Muted>
        }
    }
    render() {
        return (
            <Page>
                <Header title="HotZone Archive" />
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
function createZoneOption({ id, name }) {
    return [id, name]
}
