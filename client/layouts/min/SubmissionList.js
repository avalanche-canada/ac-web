import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import subDays from 'date-fns/sub_days'
import { endOfYesterday } from 'date-fns'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import Button, { Sorting } from 'components/button'
import { Header, Main, Content } from 'components/page'
import { Page } from 'layouts/pages'
import { Muted, Error, Loading } from 'components/text'
import { Br } from 'components/misc'
import { Responsive, FlexContentCell } from 'components/table'
import {
    useForecastRegions,
    useForecastRegionsMetadata,
} from 'hooks/async/features'
import * as min from 'hooks/async/min'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import { DateElement, DateTime, Relative } from 'components/time'
import * as links from 'components/links'
import { INCIDENT, NAMES } from 'constants/min'
import { NONE, DESC } from 'constants/sortings'
import { Boundary as ErrorBoundary } from 'components/error'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import Shim from 'components/Shim'
import { pluralize } from 'utils/string'
import styles from 'components/text/Text.css'
import { useFilters, useSorting } from 'hooks/collection'
import useParams, { NumberParam, SetParam, SortingParam } from 'hooks/params'
import { useMerge } from 'hooks/async'
import { useLocation } from 'router/hooks'

SubmissionListLayout.propTypes = {
    navigate: PropTypes.func.isRequired,
}

export default function SubmissionListLayout({ navigate }) {
    const [params, stringify] = useParams({
        days: NumberParam,
        types: SetParam,
        regions: SetParam,
        sorting: SortingParam,
    })
    function handleParamsChange(params) {
        navigate(stringify(params))
    }
    function handleReset() {
        handleParamsChange({ days: DAYS })
    }
    function handleSortingChange(name, order) {
        handleParamsChange({
            sorting: [name, order],
        })
    }
    const { days = DAYS } = params
    const fallback = <FallbackError days={days} onReset={handleReset} />
    function renderHeader({ name, title, style, sorting }) {
        return sorting ? (
            <FlexContentCell key={name} style={style}>
                {title}
                <Sorting
                    sorting={getSorting(name, sorting, params.sorting)}
                    onChange={order => handleSortingChange(name, order)}
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
            <Header title="Mountain Information Network — Reports" />
            <Content>
                <Main>
                    <Form params={params} onParamsChange={handleParamsChange} />
                    <Br />
                    <ErrorBoundary key={days} fallback={fallback}>
                        <Responsive>
                            <table>
                                <thead>
                                    <tr>{COLUMNS.map(renderHeader)}</tr>
                                </thead>
                                <TableContent {...params} />
                            </table>
                        </Responsive>
                    </ErrorBoundary>
                </Main>
            </Content>
        </Page>
    )
}

// Components
function Form({ params, onParamsChange }) {
    const [data] = useForecastRegionsMetadata()
    const options = useMemo(() => new Map(data.map(createRegionOption)), [data])
    const from = subDays(new Date(), params.days || DAYS)
    function handleFromDateChange(from) {
        const days = differenceInCalendarDays(new Date(), from)

        onParamsChange({ days })
    }
    function handleTypesChange(types) {
        onParamsChange({ types })
    }
    function handleRegionsChange(regions) {
        onParamsChange({ regions })
    }

    return (
        <Metadata>
            <Entry term="From" horizontal>
                <DayPicker
                    date={from}
                    onChange={handleFromDateChange}
                    disabledDays={{ after: endOfYesterday() }}
                />
            </Entry>
            <Entry term="To" horizontal>
                <Shim left>
                    <DateElement />
                </Shim>
            </Entry>
            <Entry term="Reports" horizontal>
                <Dropdown
                    value={params.types}
                    onChange={handleTypesChange}
                    options={NAMES}
                    placeholder="Show all"
                />
            </Entry>
            <Entry term="Regions" horizontal>
                <Dropdown
                    value={params.regions}
                    onChange={handleRegionsChange}
                    options={options}
                    placeholder="Show all"
                />
            </Entry>
        </Metadata>
    )
}

function TableContent(params) {
    const { location } = useLocation()
    const [reports = [], pending, errors] = useReports(params)

    return (
        <Fragment>
            <tbody>
                {reports.map(submission => (
                    <tr key={submission.subid}>
                        {COLUMNS.map(({ name, style, property }) => (
                            <td key={name} style={style}>
                                {property(submission)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <caption>
                {pending ? (
                    <Muted>
                        Loading Mountain Information Network reports...
                    </Muted>
                ) : errors.length > 0 ? (
                    <Error>
                        {pluralize('error', errors.length, true)} occured while
                        loading data.
                    </Error>
                ) : reports.length === 0 ? (
                    <Loading>
                        No reports found.
                        {location.search && (
                            <span>
                                You can{' '}
                                <Link to={location.pathname}>
                                    clear your search criteria
                                </Link>{' '}
                                to find more reports.
                            </span>
                        )}
                    </Loading>
                ) : (
                    <Muted>Total of {reports.length} reports found.</Muted>
                )}
            </caption>
        </Fragment>
    )
}

function FallbackError({ error, onReset, days }) {
    return (
        <Fragment>
            <Error>
                An error happened while retrieving Mountain Information
                Information reports for the last {days} days.
            </Error>
            <Error>{error.message}</Error>
            {error.name === 'RangeError' && (
                <Button onClick={onReset}>Reset to the last {DAYS} days</Button>
            )}
        </Fragment>
    )
}

// Hooks
// Combine data fetching, filtering & sorting in one hook
function useReports(params) {
    const [[regions, reports], pending, errors] = useMerge(
        useForecastRegions(),
        min.useReports(params.days || DAYS)
    )
    let submissions = useMemo(() => {
        if (regions && reports) {
            return runSpatialAnalysis(reports, regions)
        }

        return []
    }, [regions, reports])

    const predicates = []

    if (params.types.size > 0) {
        predicates.push(report => {
            const reportTypes = report.obs.map(pluckObtype)

            return reportTypes.some(type => params.types.has(type))
        })
    }

    if (params.regions.size > 0) {
        predicates.push(report =>
            'region' in report ? params.regions.has(report.region.id) : false
        )
    }

    const [name, order] = params.sorting

    submissions = useFilters(submissions, predicates)
    submissions = useSorting(submissions, SORTERS.get(name), order === DESC)

    return [submissions, pending, errors.filter(Boolean)]
}

// Constants
const DAYS = 7
const SORTERS = new Map([
    ['date', (a, b) => new Date(a.datetime) - new Date(b.datetime)],
    ['reporter', (a, b) => a.user.localeCompare(b.user)],
    [
        'region',
        (a, b) => {
            if (a.region && b.region) {
                return a.region.name.localeCompare(b.region.name)
            }

            if (!a.region && !b.region) {
                return 0
            }

            return a.region ? -1 : 1
        },
    ],
])
const COLUMNS = [
    {
        name: 'pin',
        property({ subid, title, obs }) {
            const withIncident = obs.some(hasIncident)
            const icon = withIncident ? pinWithIncident : pin

            return (
                <links.MountainInformationNetwork
                    id={subid}
                    title={`Look at ${title} report on the map`}>
                    <img src={icon} height={30} width={20} />
                </links.MountainInformationNetwork>
            )
        },
        style: {
            minWidth: 40,
        },
    },
    {
        name: 'title',
        title: 'Title',
        property({ title, uploads }) {
            const { length } = uploads

            return (
                <Fragment>
                    {title}
                    <br />
                    {length ? (
                        <small className={styles.Muted}>
                            {pluralize('photo', length, true)} attached
                        </small>
                    ) : null}
                </Fragment>
            )
        },
    },
    {
        name: 'date',
        title: 'Date',
        property({ datetime }) {
            return (
                <span>
                    <DateTime value={datetime} />
                    <br />
                    <small className={styles.Muted}>
                        <Relative value={datetime} />
                    </small>
                </span>
            )
        },
        sorting: NONE,
    },
    {
        name: 'reporter',
        title: 'Reporter',
        property({ user }) {
            return user
        },
        sorting: NONE,
    },
    {
        name: 'region',
        title: 'Forecast Region',
        property({ region }) {
            return region ? (
                <links.Forecast id={region.id}>{region.name}</links.Forecast>
            ) : null
        },
        sorting: NONE,
    },
    {
        name: 'types',
        title: 'Available reports',
        property({ obs }) {
            return (
                <ul>
                    {obs.map(pluckObtype).map(type => (
                        <li key={type}>{NAMES.get(type)}</li>
                    ))}
                </ul>
            )
        },
    },
]

// Utils
function pluckObtype({ obtype }) {
    return obtype
}
function createRegionOption({ id, name }) {
    return [id, name]
}
function hasIncident({ obtype }) {
    return obtype === INCIDENT
}
function runSpatialAnalysis(reports, { features }) {
    return reports.map(report => {
        const point = turf.point(report.lnglat)

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
// Weird function!!! Used to set the order on the header.
function getSorting(name, order, sorting) {
    if (Array.isArray(sorting)) {
        if (sorting[0] === name) {
            return sorting[1]
        }
    }

    return order
}
