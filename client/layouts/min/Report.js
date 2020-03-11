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
import { DateElement, DateTime, Relative } from 'components/time'
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

Report.propTypes = {
    navigate: PropTypes.func.isRequired,
}

export default function Report({ navigate }) {
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
                    title={'Group the table by ' + title}
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

    return (
        <Page>
            <Header title="MIN To Win" />
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
                                <tr>{COLUMNS.map(renderHeader)}</tr>
                            </thead>
                            {isAuthenticated ? (
                                <TableContent
                                    dateFrom={dateFrom}
                                    dateTo={dateTo}
                                    grouping={grouping}
                                />
                            ) : (
                                <T.Warning as="caption">
                                    You need to be logged in to see some
                                    content.
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
            <Entry term="From" horizontal>
                <DayPicker
                    date={dateFrom}
                    placeholder="Pick a from date"
                    onChange={handleFromDateChange}
                    disabledDays={{ after: subDays(dateTo, 1) }}
                />
            </Entry>
            <Entry term="To" horizontal>
                <DayPicker
                    date={dateTo}
                    placeholder="Pick a to date"
                    onChange={handleToDateChange}
                    disabledDays={{ after: startOfYesterday() }}
                />
            </Entry>
        </Metadata>
    )
}

function TableContent({ dateFrom, dateTo, grouping }) {
    const { location } = useLocation()
    const [reports, pending, errors] = useReports(dateFrom, dateTo)
    const groups = useMemo(() => {
        if (!grouping) {
            return null
        }

        const { groupingKey, emptyGroupKey } = COLUMNS.find(
            ({ name }) => name === grouping
        )

        return reports.reduce((groups, report) => {
            const groupKey = get(report, groupingKey, emptyGroupKey)

            if (groupKey in groups) {
                groups[groupKey].push(report)
            } else {
                groups[groupKey] = [report]
            }

            return groups
        }, {})
    }, [grouping, reports])

    if (errors.length > 0) {
        return <T.Error as="caption">{errors[0].message}</T.Error>
    }

    return (
        <Fragment>
            {grouping ? (
                Object.entries(groups).map(([region, reports]) => (
                    <tbody key={region}>
                        <tr>
                            <th colSpan={COLUMNS.length}>
                                {region} ({reports.length})
                            </th>
                        </tr>
                        <RowSet items={reports}></RowSet>
                    </tbody>
                ))
            ) : (
                <tbody>
                    <RowSet items={reports}></RowSet>
                </tbody>
            )}
            <caption>
                {pending ? (
                    <T.Muted>
                        Loading Mountain Information Network reports...
                    </T.Muted>
                ) : reports.length === 0 ? (
                    <T.Muted>
                        No reports found from <DateElement value={dateFrom} />{' '}
                        to <DateElement value={dateTo} />.
                        {location.search && (
                            <span>
                                You can{' '}
                                <Link to={location.pathname}>
                                    clear your search criteria
                                </Link>{' '}
                                to find more reports.
                            </span>
                        )}
                    </T.Muted>
                ) : (
                    <T.Muted>
                        Total of {reports.length} reports found from{' '}
                        <DateElement value={dateFrom} /> (start of the day) to{' '}
                        <DateElement value={dateTo} /> (end of the day).
                    </T.Muted>
                )}
            </caption>
        </Fragment>
    )
}
function RowSet({ items }) {
    return items.map(item => (
        <tr key={item.subId}>
            {COLUMNS.map(({ name, style, property }) => (
                <td key={name} style={style}>
                    {property(item)}
                </td>
            ))}
        </tr>
    ))
}

function useReports(dateFrom, dateTo) {
    const [[regions, reports], pending, errors] = useMerge(
        useForecastRegions(),
        min.useMINToWinReports(dateFrom, dateTo)
    )
    let submissions = useMemo(() => {
        if (regions && reports) {
            const submissions = runSpatialAnalysis(reports, regions)

            return submissions
        }

        return []
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
const COLUMNS = [
    {
        name: 'pin',
        property({ subId }) {
            return (
                <links.MountainInformationNetwork
                    id={subId}
                    title="Look at this report on the map">
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
        title: 'Date',
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
        title: 'Title',
        property({ title }) {
            return title
        },
    },
    {
        name: 'user',
        title: 'User',
        property({ email }) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return <a href={`mailto:${email}`}>{email}</a>
            }
            return email
        },
    },
    {
        name: 'region',
        title: 'Region',
        property({ region }) {
            return region ? (
                <links.Forecast id={region.id}>{region.name}</links.Forecast>
            ) : null
        },
        groupingKey: 'region.name',
        emptyGroupKey: 'Outside',
    },
]
