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
import { incidentsBaseUrl } from 'requests/config.json'
import styles from './incidents.css'

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
    const [payload, pending] = hooks.useIncidents(page, from, to)
    function handlerFiltersChange(filters) {
        setFilters(filters)
        setPage(1)
    }

    return (
        <Fragment>
            <IncidentFilters values={filters} onChange={handlerFiltersChange} />
            {pending ? (
                <Loading />
            ) : (
                <Fragment>
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
        </Fragment>
    )
}

function IncidentTable({ incidents }) {
    return (
        <Responsive>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Province</th>
                        <th>Activity</th>
                        <th>Involvement</th>
                        <th>Injury</th>
                        <th>Fatal</th>
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
                                <Link to={props.id}>view</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Responsive>
    )
}

function IncidentDetails({ id }) {
    const [incident, pending] = hooks.useIncident(id)

    return pending ? (
        <Loading />
    ) : incident ? (
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
    ) : (
        <Warning>Incident #{id} not found</Warning>
    )
}

function IncidentFilters({ onChange, values }) {
    const { from, to } = values
    const froms = useMemo(() => {
        // Remove last filter year ( most recent ) as it results in an empty "TO" list and no elements
        // Validate this works when there are entries for this year
        const f = FILTERS.slice(0, FILTERS.length - 1)

        return new Map(
            f.filter(f => startsBefore(f, to)).map(f => [f.season, f.title])
        )
    }, [to])
    const tos = useMemo(
        () =>
            new Map(
                FILTERS.filter(f => startsAfter(f, from)).map(f => [
                    f.season,
                    f.title,
                ])
            ),

        [from]
    )
    function handleChangeFrom(from) {
        onChange({ from, to })
    }
    function handleChangeTo(to) {
        onChange({ from, to })
    }

    return (
        <div className={styles.Filters}>
            <div>
                <label>From:</label>
                <DropdownFromOptions
                    onChange={handleChangeFrom}
                    value={from}
                    placeholder="From"
                    options={froms}
                />
            </div>
            <div>
                <label>To:</label>
                <DropdownFromOptions
                    onChange={handleChangeTo}
                    value={to}
                    placeholder="To"
                    options={tos}
                />
            </div>
        </div>
    )
}

function Summary({ incident }) {
    return (
        <section className={styles.Summary}>
            <h2>Incident Summary</h2>
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
                        <th>Date/Time</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Trigger</th>
                        <th>Elevation</th>
                        <th>Aspect</th>
                        <th>Slab Width</th>
                        <th>Slab Thickness</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </Section>
    )
}

function Weather({ observations, comment }) {
    return (
        <Section title="Weather">
            <table>
                <thead>
                    <tr>
                        <th>Present Temp</th>
                        <th>Max Temp</th>
                        <th>Min Temp</th>
                        <th>24hr Trend</th>
                        <th>Wind Speed</th>
                        <th>Wind Direction</th>
                        <th>Sky Condition</th>
                        <th>Precipitation Type & Intensity</th>
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
            <Comment title="Weather Comment">{comment}</Comment>
        </Section>
    )
}

function Snowpack({ observations, comment }) {
    return (
        <Section title="Snowpack">
            <table>
                <thead>
                    <tr>
                        <th>Snowpack</th>
                        <th>24hr Snow</th>
                        <th>Storm Snow</th>
                        <th>Storm Date</th>
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
            <Comment title="Snowpack Comment">{comment}</Comment>
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
                    view
                </a>
            </td>
        </tr>
    ))

    return (
        <Section title="Documents">
            {rows.length === 0 ? (
                <Muted>No documents available.</Muted>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Document Date</th>
                            <th>Title</th>
                            <th>Source</th>
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

const FILTERS = makeFilters()
function makeFilters() {
    var start = 1981
    var now = new Date()
    var end = now.getFullYear()

    if (now.getMonth() < 6) {
        end = end - 1
    }

    var filters = []

    filters.push({
        title: '1980/1981 and earlier',
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
}
