import React, { Fragment, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import get from 'lodash/get'
import subDays from 'date-fns/sub_days'
import startOfYesterday from 'date-fns/start_of_yesterday'
import subWeeks from 'date-fns/sub_weeks'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import { Page } from 'layouts/pages'
import { Header, Main, Content } from 'components/page'
import { Grouping } from 'components/button'
import * as T from 'components/text'
import { Br } from 'components/misc'
import { Responsive, FlexContentCell } from 'components/table'
import { DateTime, Relative } from 'components/time'
import * as min from 'hooks/async/min'
import { Metadata, Entry } from 'components/metadata'
import { DayPicker } from 'components/controls'
import * as links from 'components/links'
import pin from 'components/icons/min/min-pin.svg'
import useParams, { DateParam } from 'hooks/params'
import { useLocation } from 'router/hooks'
import { useAuth } from 'contexts/auth'
import { useForecastRegions } from 'hooks/async/features'
import { useMerge } from 'hooks/async'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFormatDate, useIntlMemo } from 'hooks/intl'
import * as Async from 'contexts/async'

Report.propTypes = {
    navigate: PropTypes.func.isRequired,
}

export default function Report({ navigate }) {
    const intl = useIntl()
    const columns = useColumns()
    const [grouping, setGrouping] = useState(null)
    const { isAuthenticated } = useAuth(true)
    const [params, stringify] = useParams({
        dateFrom: DateParam,
        dateTo: DateParam,
    })
    function handleParamsChange(params) {
        navigate(stringify(params))
    }
    const yesterday = subDays(new Date(), 1)
    const { dateFrom = subWeeks(yesterday, 1), dateTo = yesterday } = params
    function renderHeader({ name, title, style, groupingKey }) {
        return groupingKey ? (
            <FlexContentCell key={name} style={style}>
                {title}
                <Grouping
                    title={intl.formatMessage(
                        {
                            defaultMessage: 'Group the table by {title}',
                        },
                        { title }
                    )}
                    active={grouping === name}
                    onClick={() => setGrouping(grouping === name ? null : name)}
                />
            </FlexContentCell>
        ) : (
            <th key={name} style={style}>
                {title}
            </th>
        )
    }
    const title = (
        <FormattedMessage
            description="Layout min/Report"
            defaultMessage="MIN To Win"
        />
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Form
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        onChange={handleParamsChange}
                    />
                    <Br />
                    <Responsive>
                        <table>
                            <thead>
                                <tr>{columns.map(renderHeader)}</tr>
                            </thead>
                            {isAuthenticated ? (
                                <TableContent
                                    dateFrom={dateFrom}
                                    dateTo={dateTo}
                                    grouping={grouping}
                                />
                            ) : (
                                <T.Warning as="caption">
                                    <FormattedMessage
                                        description="Layout min/Report"
                                        defaultMessage="You need to be logged in to see some content."
                                    />
                                </T.Warning>
                            )}
                        </table>
                    </Responsive>
                </Main>
            </Content>
        </Page>
    )
}

// Components
function Form({ dateFrom, dateTo, onChange }) {
    function handleFromDateChange(dateFrom) {
        onChange({ dateFrom })
    }
    function handleToDateChange(dateTo) {
        onChange({ dateTo })
    }

    return (
        <Metadata>
            <Entry
                term={
                    <FormattedMessage
                        description="Layout min/Report"
                        defaultMessage="From"
                    />
                }
                horizontal>
                <DayPicker
                    date={dateFrom}
                    placeholder={
                        <FormattedMessage
                            description="Layout min/Report"
                            defaultMessage="Pick a from date"
                        />
                    }
                    onChange={handleFromDateChange}
                    disabledDays={{ after: subDays(dateTo, 1) }}
                />
            </Entry>
            <Entry
                term={
                    <FormattedMessage
                        description="Layout min/Report"
                        defaultMessage="To"
                    />
                }
                horizontal>
                <DayPicker
                    date={dateTo}
                    placeholder={
                        <FormattedMessage
                            description="Layout min/Report"
                            defaultMessage="Pick a to date"
                        />
                    }
                    onChange={handleToDateChange}
                    disabledDays={{ after: startOfYesterday() }}
                />
            </Entry>
        </Metadata>
    )
}

function TableContent({ dateFrom, dateTo, grouping }) {
    const from = useFormatDate(dateFrom)
    const to = useFormatDate(dateTo)
    const { location } = useLocation()
    const columns = useColumns()

    return (
        <Async.Provider value={useReport(dateFrom, dateTo, grouping, columns)}>
            <Async.Found>
                {({ reports, groups }) =>
                    groups ? (
                        Array.from(groups).map(([region, reports]) => (
                            <tbody key={region}>
                                <tr>
                                    <th colSpan={columns.length}>
                                        {region} ({reports.length})
                                    </th>
                                </tr>
                                <RowSet
                                    items={reports}
                                    columns={columns}></RowSet>
                            </tbody>
                        ))
                    ) : (
                        <tbody>
                            <RowSet items={reports} columns={columns}></RowSet>
                        </tbody>
                    )
                }
            </Async.Found>
            <caption>
                <Async.Errors>
                    {errors => (
                        <T.Error>
                            <ul>
                                {errors.map(({ message }) => (
                                    <li key={message}>{message}</li>
                                ))}
                            </ul>
                        </T.Error>
                    )}
                </Async.Errors>
                <T.Muted>
                    <Async.Pending>
                        <FormattedMessage defaultMessage="Loading Mountain Information Network reports..." />
                    </Async.Pending>
                    <Async.Found>
                        {({ reports }) => (
                            <Fragment>
                                <FormattedMessage
                                    description="Layout min/Report"
                                    defaultMessage="{count, plural, =0 {No report} one {One report} other {Total of # reports}} found from {from} (start of the day) to {to} (end of the day)."
                                    values={{
                                        from,
                                        to,
                                        count: reports.length,
                                    }}
                                />
                                {location.search && reports.length === 0 && (
                                    <p>
                                        <FormattedMessage
                                            description="Layout min/Report"
                                            defaultMessage="You can <link>clear your search criteria</link> to find more reports."
                                            values={{
                                                link(chunks) {
                                                    return (
                                                        <Link
                                                            to={
                                                                location.pathname
                                                            }>
                                                            {chunks}
                                                        </Link>
                                                    )
                                                },
                                            }}
                                        />
                                    </p>
                                )}
                            </Fragment>
                        )}
                    </Async.Found>
                </T.Muted>
            </caption>
        </Async.Provider>
    )
}
function RowSet({ items, columns }) {
    return items.map(item => (
        <tr key={item.subId}>
            {columns.map(({ name, style, property }) => (
                <td key={name} style={style}>
                    {property(item)}
                </td>
            ))}
        </tr>
    ))
}

function useReport(dateFrom, dateTo, grouping, columns) {
    const [reports, ...rest] = useReports(dateFrom, dateTo)
    const groups = useMemo(() => {
        if (!grouping || !reports) {
            return null
        }

        const { groupingKey, emptyKeyGroupName } = columns.find(
            ({ name }) => name === grouping
        )
        const groups = reports.reduce((groups, report) => {
            const key = get(report, groupingKey)

            if (groups.has(key)) {
                groups.get(key).push(report)
            } else {
                groups.set(key, [report])
            }

            return groups
        }, new Map())

        return new Map(
            Array.from(groups.keys())
                .sort()
                .map(key => [key || emptyKeyGroupName, groups.get(key)])
        )
    }, [grouping, reports])

    return [reports ? { reports, groups } : undefined, ...rest]
}

function useReports(dateFrom, dateTo) {
    const [[regions, reports], pending, errors] = useMerge(
        useForecastRegions(),
        min.useMINToWinReports(dateFrom, dateTo)
    )
    const submissions = useMemo(() => {
        if (regions && reports) {
            const submissions = runSpatialAnalysis(reports, regions)

            return submissions
        }
    }, [regions, reports])

    return [submissions, pending, errors.filter(Boolean)]
}
function runSpatialAnalysis(reports, { features }) {
    return reports.map(report => {
        const point = turf.point([report.longitude, report.latitude])

        for (const region of features) {
            if (inside(point, region)) {
                return {
                    ...report,
                    region: region.properties,
                }
            }
        }

        return report
    })
}

// Constants
function useColumns() {
    return useIntlMemo(intl => [
        {
            name: 'pin',
            property({ subId }) {
                const title = intl.formatMessage({
                    defaultMessage: 'Look at this report on the map',
                })

                return (
                    <links.MountainInformationNetwork id={subId} title={title}>
                        <img src={pin} height={30} width={20} />
                    </links.MountainInformationNetwork>
                )
            },
            style: {
                minWidth: 40,
            },
        },
        {
            name: 'datetime',
            title: intl.formatMessage({ defaultMessage: 'Date' }),
            property({ submissionDatetime }) {
                return (
                    <span>
                        <DateTime value={submissionDatetime} />
                        <br />
                        <T.Muted as="small">
                            <Relative value={submissionDatetime} />
                        </T.Muted>
                    </span>
                )
            },
        },
        {
            name: 'title',
            title: intl.formatMessage({ defaultMessage: 'Title' }),
            property({ title }) {
                return title
            },
        },
        {
            name: 'user',
            title: intl.formatMessage({ defaultMessage: 'User' }),
            property({ email }) {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    return <a href={`mailto:${email}`}>{email}</a>
                }
                return email
            },
        },
        {
            name: 'region',
            title: intl.formatMessage({ defaultMessage: 'Region' }),
            property({ region }) {
                return region ? (
                    <links.Forecast id={region.id}>
                        {region.name}
                    </links.Forecast>
                ) : null
            },
            groupingKey: 'region.name',
            emptyKeyGroupName: intl.formatMessage({
                defaultMessage: 'Outside a region',
            }),
        },
    ])
}
