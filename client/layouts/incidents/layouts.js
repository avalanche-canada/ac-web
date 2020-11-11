import React, { useState, useMemo, Fragment } from 'react'
import { Router, Link } from '@reach/router'
import format from 'date-fns/format'
import * as hooks from 'hooks/async/incidents'
import { Loading, Warning, Muted } from 'components/text'
import Pagination from 'components/pagination'
import { Responsive } from 'components/table'
import { List, Entry } from 'components/description'
import { DropdownFromOptions } from 'components/controls'
import Shim from 'components/Shim'
import { Details } from 'components/error'
import { Br } from 'components/misc'
import * as Async from 'contexts/async'
import { incidentsBaseUrl } from 'requests/config.json'
import { Metadata, Entry as MetadataEntry } from 'components/metadata'
import styles from './incidents.css'
import { FormattedMessage, useIntl } from 'react-intl'
import { useIntlMemo } from 'hooks/intl'


export default function Layout() {
    return (
        <Router>
            <IncidentsList path="/" />
            <IncidentDetails path=":id" />
        </Router>
    )
}

function IncidentsList() {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState({})
    const from = filters.from ? seasonToFrom(filters.from) : undefined
    const to = filters.to ? seasonToTo(filters.to) : undefined
    function handlerFiltersChange(filters) {
        setFilters(filters)
        setPage(1)
    }

    return (
        <Async.Provider value={hooks.useIncidents(page, from, to)}>
            <IncidentFilters values={filters} onChange={handlerFiltersChange} />
            <Async.Pending>
                <Loading>
                    <FormattedMessage
                        description="Layout incidents/layouts"
                        defaultMessage="Loading incidents..."
                    />
                </Loading>
            </Async.Pending>
            <Async.Found>
                {payload => (
                    <Fragment>
                        <Br />
                        <IncidentTable incidents={payload.results} />
                        <Shim vertical>
                            <Pagination
                                total={payload.count / 50}
                                active={page}
                                onChange={setPage}
                            />
                        </Shim>
                    </Fragment>
                )}
            </Async.Found>
        </Async.Provider>
    )
}

function IncidentTable({ incidents }) {
    return (
        <Responsive>
            <table>
                <thead>
                    <tr>
                        <th>
                            <FormattedMessage
                                description="Layout incidents/layout"
                                defaultMessage="Date"
                            /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layout"
                            defaultMessage="Location"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layout"
                            defaultMessage="Province"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layout"
                            defaultMessage="Activity"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layout"
                            defaultMessage="Involvement"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layout"
                            defaultMessage="Injury"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layout"
                            defaultMessage="Fatal"
                        /></th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {incidents.map(props => (
                        <tr key={props.id}>
                            <td>
                                <span className={styles.DateCell}>
                                    {props.date}
                                </span>
                            </td>
                            <td>{props.location}</td>
                            <Cell>{props.location_province}</Cell>
                            <td>{props.group_activity}</td>
                            <Cell>{props.num_involved}</Cell>
                            <Cell>{props.num_injured}</Cell>
                            <Cell>{props.num_fatal}</Cell>
                            <td>
                                <Link to={props.id}>
                                    <FormattedMessage
                                        description="Layout incidents/layout"
                                        defaultMessage="view"
                                    /></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Responsive>
    )
}

function IncidentDetails({ id }) {
    const intl = useIntl()
    return (
        <Async.Provider value={hooks.useIncident(id)}>
            <Async.Pending>
                <Loading>
                    <Loading>
                        <FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Loading incident..."
                        />
                    </Loading>
                </Loading>
            </Async.Pending>
            <Async.Found>
                {incident => (
                    <article>
                        <Summary incident={incident} />
                        <Avalanche avalanches={incident.avalanche_obs} />
                        <Weather
                            observations={incident.weather_obs}
                            comment={incident.weather_comment}
                        />
                        <Snowpack
                            observations={incident.snowpack_obs}
                            comment={incident.snowpack_comment}
                        />
                        <Documents docs={incident.documents} />
                    </article>
                )}
            </Async.Found>
            <Async.FirstError>
                <Async.NotFound>
                    <Warning>
                        <FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Incident #{id} not found"
                            values={{
                                id
                            }}
                        />
                    </Warning>
                </Async.NotFound>
                <Async.Error>
                    <Details
                        summary={
                            intl.formatMessage({
                                defaultMessage: 'An error occurred while loading incident.',
                                description: 'Layout incidents/layouts',
                            })
                        } />
                </Async.Error>
                <Async.Throw />
            </Async.FirstError>
        </Async.Provider>
    )
}

function IncidentFilters({ onChange, values }) {
    const filters = useFilters()
    const { from, to } = values
    const froms = useMemo(() => {
        // Remove last filter year ( most recent ) as it results in an empty "TO" list and no elements
        // Validate this works when there are entries for this year
        const f = filters.slice(0, filters.length - 1)

        return new Map(
            f.filter(f => startsBefore(f, to)).map(f => [f.season, f.title])
        )
    }, [to])
    const tos = useMemo(
        () =>
            new Map(
                filters.filter(f => startsAfter(f, from)).map(f => [
                    f.season,
                    f.title,
                ])
            ),

        [from]
    )
    const intl = useIntl()
    function handleChangeFrom(from) {
        onChange({ from, to })
    }
    function handleChangeTo(to) {
        onChange({ from, to })
    }

    return (
        <Metadata>
            <MetadataEntry
                term={
                    intl.formatMessage({
                        defaultMessage: 'From',
                        description: 'Layout incidents/layouts',
                    })
                } horizontal>
                <DropdownFromOptions
                    onChange={handleChangeFrom}
                    value={from}
                    placeholder={
                        intl.formatMessage({
                            defaultMessage: 'From',
                            description: 'Layout incidents/layouts',
                        })
                    }
                    options={froms}
                />
            </MetadataEntry>
            <MetadataEntry term={
                intl.formatMessage({
                    defaultMessage: 'To',
                    description: 'Layout incidents/layouts',
                })} horizontal>
                <DropdownFromOptions
                    onChange={handleChangeTo}
                    value={to}
                    placeholder={
                        intl.formatMessage({
                            defaultMessage: 'To',
                            description: 'Layout incidents/layouts',
                        })
                    }
                    options={tos}
                />
            </MetadataEntry>
        </Metadata>
    )
}

function Summary({ incident }) {
    return (
        <section className={styles.Summary}>
            <h2>
                <FormattedMessage
                    description="Layout incidents/layouts"
                    defaultMessage="Incident Summary"
                />
            </h2>
            <List>
                <Entry term="Date">{incident.ob_date}</Entry>
                <Entry term="Location">{incident.location}</Entry>
                <Entry term="Location Description">
                    {incident.location_desc}
                </Entry>
                <Entry term="Province">{incident.location_province}</Entry>
                <Entry term="Coordinates">
                    {latLng(incident.location_coords)}
                </Entry>
                <Entry term="Elevation">{incident.location_elevation} m</Entry>
                <Entry term="Activity">{incident.group_activity}</Entry>
                <Entry term="Involvement">{incident.num_involved}</Entry>
                <Entry term="Injury">{incident.num_injured}</Entry>
                <Entry term="Fatality">{incident.num_fatal}</Entry>
                <Entry term="Description">{incident.comment}</Entry>
            </List>
        </section>
    )
}

function Avalanche({ avalanches }) {
    const rows = avalanches.map((avalanche, i) => (
        <tr key={i}>
            <td>{avalanche.observation_date}</td>
            <Cell>{avalanche.size}</Cell>
            <Cell>{avalanche.type}</Cell>
            <Cell>{avalanche.trigger}</Cell>
            <Cell suffix="m">{avalanche.elevation}</Cell>
            <Cell>{avalanche.aspect}</Cell>
            <Cell suffix="m">{avalanche.slab_width}</Cell>
            <Cell suffix="cm">{avalanche.slab_thickness}</Cell>
        </tr>
    ))

    return (
        <Section title="Avalanches">
            <table>
                <thead>
                    <tr>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Date/Time"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Size"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Type"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Trigger"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Elevation"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Aspect"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Slab width"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Slab Thickness"
                        /></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </Section>
    )
}

function Weather({ observations, comment }) {
    const intl = useIntl()
    return (
        <Section title="Weather">
            <table>
                <thead>
                    <tr>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Present Temp"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Max Temp"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Min Temp"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="24hr Trend"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Wind Speed"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Wind Direction"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Sky Condition"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Precipitation Type & Intensity"
                        /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Cell>{observations.temp_pressent}</Cell>
                        <Cell>{observations.temp_max}</Cell>
                        <Cell>{observations.temp_min}</Cell>
                        <Cell>{observations.temp_trend}</Cell>
                        <Cell>{observations.wind_speed}</Cell>
                        <Cell>{observations.wind_dir}</Cell>
                        <Cell>{observations.sky}</Cell>
                        <Cell>{observations.precip}</Cell>
                    </tr>
                </tbody>
            </table>
            <Comment title={
                intl.formatMessage({
                    defaultMessage: 'Weather Comment',
                    description: 'Layout incidents/layouts',
                })
            }>{comment}</Comment>
        </Section>
    )
}

function Snowpack({ observations, comment }) {
    const intl = useIntl()
    return (
        <Section title="Snowpack">
            <table>
                <thead>
                    <tr>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Snowpack"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="24hr Snow"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Storm Snow"
                        /></th>
                        <th><FormattedMessage
                            description="Layout incidents/layouts"
                            defaultMessage="Storm Date"
                        /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Cell suffix="cm">{observations.hs}</Cell>
                        <Cell suffix="cm">{observations.hn24}</Cell>
                        <Cell suffix="cm">{observations.hst}</Cell>
                        <Cell suffix="cm">{observations.hst_reset}</Cell>
                    </tr>
                </tbody>
            </table>
            <Comment title={
                intl.formatMessage({
                    defaultMessage: 'Snowpack Comment',
                    description: 'Layout incidents/layouts',
                })
            }>{comment}</Comment>
        </Section>
    )
}

function Documents({ docs }) {
    const rows = docs.map((d, i) => (
        <tr key={i}>
            <td>{d.date}</td>
            <td>{d.title}</td>
            <td>{d.source}</td>
            <td>
                <a href={incidentsBaseUrl + d.url} target={d.title}>
                    <FormattedMessage
                        description="Layout incidents/layout"
                        defaultMessage="view"
                    />
                </a>
            </td>
        </tr>
    ))

    return (
        <Section title="Documents">
            {rows.length === 0 ? (
                <Muted>
                    <FormattedMessage
                        description="Layout incidents/layouts"
                        defaultMessage="No documents available."
                    /></Muted>
            ) : (
                    <table>
                        <thead>
                            <tr>
                                <th><FormattedMessage
                                    description="Layout incidents/layouts"
                                    defaultMessage="Document Date"
                                /></th>
                                <th><FormattedMessage
                                    description="Layout incidents/layouts"
                                    defaultMessage="Title"
                                /></th>
                                <th><FormattedMessage
                                    description="Layout incidents/layouts"
                                    defaultMessage="Source"
                                /></th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                )}
        </Section>
    )
}

function Section({ title, children }) {
    return (
        <section>
            <h3>{title}</h3>
            {children}
        </section>
    )
}

function Comment({ children, title }) {
    return children ? (
        <p>
            <b>{title}: </b> {children}
        </p>
    ) : null
}

function Cell({ children, suffix }) {
    if (typeof children === 'number') {
        children = children.toString()
    }

    return (
        <td>{children ? [children, suffix].filter(Boolean).join(' ') : '-'}</td>
    )
}

// Utils
/*
 * TODO(wnh): This is SOOOO gross. I feel dirty.
 */
function seasonToFrom(season) {
    if (season === 1980) {
        return '0001-01-01'
    } else {
        return format(new Date(season, 5, 1), 'YYYY-MM-DD')
    }
}
function seasonToTo(season) {
    return format(new Date(season + 1, 4, 30), 'YYYY-MM-DD')
}
function latLng(coords) {
    if (!Array.isArray(coords)) {
        return '-'
    }

    return (
        coords
            .filter(Boolean)
            .map(Number)
            .map(coord => `${coord.toFixed(5)} °`)
            .join(', ') || '-'
    )
}
function startsBefore(filterVal, currentToVal) {
    // If the current set from value is null or undefined show everything
    if (!currentToVal) {
        return true
    } else {
        return filterVal.season < currentToVal
    }
}
function startsAfter(filterVal, currentFromVal) {
    // If the current set from value is null or undefined show everything
    if (!currentFromVal) {
        return true
    } else {
        return filterVal.season > currentFromVal
    }
}

/*
 * TODO(wnh): clean this up
 * TODO(wnh): do some more (any?) testing
 */

function useFilters() {
    return useIntlMemo((intl) => {
        var start = 1981
        var now = new Date()
        var end = now.getFullYear()

        if (now.getMonth() < 6) {
            end = end - 1
        }

        var filters = []

        filters.push({
            title: intl.formatMessage({
                defaultMessage: '1980/1981 and earlier',
                description: 'Layout incidents/layouts',
            }),
            season: 1980,
            start: '0000-01-01',
            end: '1980-06-30',
        })

        for (var i = start; i <= end; i++) {
            const f = {
                title: String(i) + '/' + String(i + 1),
                season: i,
                start: format(new Date(i, 5, 1), 'YYYY-MM-DD'),
                end: format(new Date(i + 1, 4, 30), 'YYYY-MM-DD'),
            }
            filters.push(f)
        }
        return filters
    })
}
