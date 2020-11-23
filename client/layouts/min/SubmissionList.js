import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from '@reach/router'
import subDays from 'date-fns/sub_days'
import { endOfYesterday } from 'date-fns'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import Button, { Sorting } from 'components/button'
import { Header, Main, Content } from 'components/page'
import { Page } from 'layouts/pages'
import { Muted, Error } from 'components/text'
import { Br } from 'components/misc'
import { Responsive, FlexContentCell } from 'components/table'
import * as min from 'hooks/async/min'
import { Metadata, Entry } from 'components/metadata'
import { DropdownFromOptions as Dropdown, DayPicker } from 'components/controls'
import { DateElement, DateTime, Relative } from 'components/time'
import * as links from 'components/links'
import { INCIDENT, useNames } from 'constants/min'
import { NONE, DESC } from 'constants/sortings'
import { Boundary as ErrorBoundary } from 'components/error'
import pinWithIncident from 'components/icons/min/min-pin-with-incident.svg'
import pin from 'components/icons/min/min-pin.svg'
import Shim from 'components/Shim'
import styles from 'components/text/Text.module.css'
import { useFilters, useSorting } from 'hooks/collection'
import useParams, { NumberParam, SetParam, SortingParam } from 'hooks/params'
import { useMerge } from 'hooks/async'
import { useLocation } from 'router/hooks'
import { useIntlMemo } from 'hooks/intl'
import * as Async from 'contexts/async'
import { useAreas } from 'hooks/async/api/areas'
import { useMetadata } from 'hooks/async/api/metadata'

SubmissionListLayout.propTypes = {
    navigate: PropTypes.func.isRequired,
}

export default function SubmissionListLayout({ navigate }) {
    const columns = useColumns()
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
    const title = (
        <FormattedMessage
            description="Layout min/SubmissionList"
            defaultMessage="Mountain Information Network — Reports"
        />
    )

    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Form params={params} onParamsChange={handleParamsChange} />
                    <Br />
                    <ErrorBoundary key={days} fallback={fallback}>
                        <Responsive>
                            <table>
                                <thead>
                                    <tr>{columns.map(renderHeader)}</tr>
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
    const names = useNames()
    const [data = ARRAY] = useMetadata()
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
            <Entry term={<FormattedMessage defaultMessage="From" />} horizontal>
                <DayPicker
                    date={from}
                    onChange={handleFromDateChange}
                    disabledDays={{ after: endOfYesterday() }}
                />
            </Entry>
            <Entry term={<FormattedMessage defaultMessage="To" />} horizontal>
                <Shim left>
                    <DateElement />
                </Shim>
            </Entry>
            <Entry term={<FormattedMessage defaultMessage="Reports" />} horizontal>
                <Dropdown
                    value={params.types}
                    onChange={handleTypesChange}
                    options={names}
                    placeholder="Show all"
                />
            </Entry>
            <Entry term={<FormattedMessage defaultMessage="Regions" />} horizontal>
                <Dropdown
                    value={params.regions}
                    onChange={handleRegionsChange}
                    options={options}
                    placeholder={<FormattedMessage defaultMessage="Show all" />}
                />
            </Entry>
        </Metadata>
    )
}

function TableContent(params) {
    const columns = useColumns()
    const { location } = useLocation()

    return (
        <Async.Provider value={useReports(params)}>
            <tbody>
                <Async.Found>
                    {reports =>
                        reports.map(report => (
                            <tr key={report.subid}>
                                {columns.map(({ name, style, property }) => (
                                    <td key={name} style={style}>
                                        {property(report)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </Async.Found>
            </tbody>
            <caption>
                <Async.Pending>
                    <Muted>
                        <FormattedMessage
                            description="Layout min/SubmissionList"
                            defaultMessage="Loading Mountain Information Network reports..."
                        />
                    </Muted>
                </Async.Pending>
                <Async.Errors>
                    {errors => (
                        <Error>
                            <FormattedMessage
                                description="Layout min/SubmissionList"
                                defaultMessage="{count, plural, one {One error} other {# errors}} occurred while loading Mountain Information Network reports."
                                values={{ count: errors.length }}
                            />
                        </Error>
                    )}
                </Async.Errors>
                <Async.Found>
                    {reports => (
                        <Muted>
                            <FormattedMessage
                                description="Layout min/SubmissionList"
                                defaultMessage="{count, plural, =0 {No report} one {One report} other {Total of # reports}} found."
                                values={{ count: reports.length }}
                            />
                            {location.search && (
                                <p>
                                    <FormattedMessage
                                        description="Layout min/SubmissionList"
                                        defaultMessage="You can <link>clear your search criteria</link> to find more reports."
                                        values={{
                                            link(chunks) {
                                                return <Link to={location.pathname}>{chunks}</Link>
                                            },
                                        }}
                                    />
                                </p>
                            )}
                        </Muted>
                    )}
                </Async.Found>
            </caption>
        </Async.Provider>
    )
}

function FallbackError({ error, onReset, days }) {
    return (
        <Fragment>
            <Error>
                <FormattedMessage
                    description="Layout min/SubmissionList"
                    defaultMessage="An error happened while retrieving Mountain Information Network reports for the last {days} days."
                    values={{ days }}
                />
            </Error>
            <Error>{error.message}</Error>
            {error.name === 'RangeError' && (
                <Button onClick={onReset}>
                    <FormattedMessage
                        description="Layout min/SubmissionList"
                        defaultMessage="Reset to the last {days} days"
                        values={{
                            days: DAYS,
                        }}
                    />
                </Button>
            )}
        </Fragment>
    )
}

// Hooks
// Combine data fetching, filtering & sorting in one hook
function useReports(params) {
    const [[areas, reports], pending, errors] = useMerge(
        useAreas(),
        min.useReports(params.days || DAYS)
    )
    let submissions = useMemo(() => {
        if (areas && reports) {
            return runSpatialAnalysis(reports, areas)
        }
    }, [areas, reports])

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

// Utils
function useColumns() {
    return useIntlMemo(intl => [
        {
            name: 'pin',
            property({ subid, title, obs }) {
                const withIncident = obs.some(hasIncident)
                const icon = withIncident ? pinWithIncident : pin

                title = intl.formatMessage(
                    {
                        description: 'Layout min/SubmissionList',
                        defaultMessage: 'Look at {title} report on the map',
                    },
                    { title }
                )

                return (
                    <links.MountainInformationNetwork id={subid} title={title}>
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
            title: <FormattedMessage defaultMessage="Title" />,
            property({ title, uploads }) {
                const { length } = uploads

                return (
                    <Fragment>
                        {title}
                        <br />
                        {length ? (
                            <small className={styles.Muted}>
                                <FormattedMessage
                                    description="Layout min/SubmissionList"
                                    defaultMessage="{count, plural, one {# photo} other {# photos}} attached"
                                    values={{ count: length }}
                                />
                            </small>
                        ) : null}
                    </Fragment>
                )
            },
        },
        {
            name: 'date',
            title: <FormattedMessage defaultMessage="Date" />,
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
            title: <FormattedMessage defaultMessage="Reporter" />,
            property({ user }) {
                return user
            },
            sorting: NONE,
        },
        {
            name: 'region',
            title: <FormattedMessage defaultMessage="Forecast Region" />,
            property({ region }) {
                return region ? <links.Forecast id={region.id}>{region.name}</links.Forecast> : null
            },
            sorting: NONE,
        },
        {
            name: 'types',
            title: <FormattedMessage defaultMessage="Available reports" />,
            property({ obs }) {
                return <NamesList types={obs.map(pluckObtype)} />
            },
        },
    ])
}
function NamesList({ types }) {
    const names = useNames()

    return (
        <ul>
            {types.map(type => (
                <li key={type}>{names.get(type)}</li>
            ))}
        </ul>
    )
}
function pluckObtype({ obtype }) {
    return obtype
}
function createRegionOption({ area }) {
    const { id, name } = area

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

const ARRAY = []
