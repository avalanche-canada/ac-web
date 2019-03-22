import React, { useMemo } from 'react'
import { Link } from '@reach/router'
import format from 'date-fns/format'
import * as t from 'components/table'
import { Muted } from 'components/text'
import { DropdownFromOptions } from 'components/controls'
import { List, Entry } from 'components/description'
import { incidentsBaseUrl } from 'api/config'
import styles from './incidents.css'

export function IncidentTable({ data }) {
    return (
        <t.Table>
            <t.Header>
                <t.Row>
                    <t.HeaderCell>Date</t.HeaderCell>
                    <t.HeaderCell>Location</t.HeaderCell>
                    <t.HeaderCell>Province</t.HeaderCell>
                    <t.HeaderCell>Activity</t.HeaderCell>
                    <t.HeaderCell>Involvement</t.HeaderCell>
                    <t.HeaderCell>Injury</t.HeaderCell>
                    <t.HeaderCell>Fatal</t.HeaderCell>
                    <t.HeaderCell />
                </t.Row>
            </t.Header>
            <t.TBody>
                {data.results.map(props => (
                    <t.Row key={props.id}>
                        <t.Cell>
                            <span className={styles.DateCell}>
                                {props.date}
                            </span>
                        </t.Cell>
                        <t.Cell>{props.location}</t.Cell>
                        <Cell>{props.location_province}</Cell>
                        <t.Cell>{props.group_activity}</t.Cell>
                        <Cell>{props.num_involved}</Cell>
                        <Cell>{props.num_injured}</Cell>
                        <Cell>{props.num_fatal}</Cell>
                        <t.Cell>
                            <Link to={props.id}>view</Link>
                        </t.Cell>
                    </t.Row>
                ))}
            </t.TBody>
        </t.Table>
    )
}

export function IncidentFilters({ onChange, values }) {
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

export function IncidentDetails({ data }) {
    const {
        avalanche_obs,
        weather_obs,
        weather_comment,
        snowpack_obs,
        snowpack_comment,
        documents,
    } = data

    return (
        <article>
            <Summary incident={data} />
            <Avalanche avalanches={avalanche_obs} />
            <Weather observations={weather_obs} comment={weather_comment} />
            <Snowpack observations={snowpack_obs} comment={snowpack_comment} />
            <Documents docs={documents} />
        </article>
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
        <t.Row key={i}>
            <t.Cell>{avalanche.observation_date}</t.Cell>
            <Cell>{avalanche.size}</Cell>
            <Cell>{avalanche.type}</Cell>
            <Cell>{avalanche.trigger}</Cell>
            <Cell suffix="m">{avalanche.elevation}</Cell>
            <Cell>{avalanche.aspect}</Cell>
            <Cell suffix="m">{avalanche.slab_width}</Cell>
            <Cell suffix="cm">{avalanche.slab_thickness}</Cell>
        </t.Row>
    ))

    return (
        <Section title="Avalanches">
            <t.Table>
                <t.Header>
                    <t.Row>
                        <t.HeaderCell>Date/Time</t.HeaderCell>
                        <t.HeaderCell>Size</t.HeaderCell>
                        <t.HeaderCell>Type</t.HeaderCell>
                        <t.HeaderCell>Trigger</t.HeaderCell>
                        <t.HeaderCell>Elevation</t.HeaderCell>
                        <t.HeaderCell>Aspect</t.HeaderCell>
                        <t.HeaderCell>Slab Width</t.HeaderCell>
                        <t.HeaderCell>Slab Thickness</t.HeaderCell>
                    </t.Row>
                </t.Header>
                <t.TBody>{rows}</t.TBody>
            </t.Table>
        </Section>
    )
}

function Weather({ observations, comment }) {
    return (
        <Section title="Weather">
            <t.Table>
                <t.Header>
                    <t.Row>
                        <t.HeaderCell>Present Temp</t.HeaderCell>
                        <t.HeaderCell>Max Temp</t.HeaderCell>
                        <t.HeaderCell>Min Temp</t.HeaderCell>
                        <t.HeaderCell>24hr Trend</t.HeaderCell>
                        <t.HeaderCell>Wind Speed</t.HeaderCell>
                        <t.HeaderCell>Wind Direction</t.HeaderCell>
                        <t.HeaderCell>Sky Condition</t.HeaderCell>
                        <t.HeaderCell>
                            Precipitation Type & Intensity
                        </t.HeaderCell>
                    </t.Row>
                </t.Header>
                <t.TBody>
                    <t.Row>
                        <Cell>{observations.temp_pressent}</Cell>
                        <Cell>{observations.temp_max}</Cell>
                        <Cell>{observations.temp_min}</Cell>
                        <Cell>{observations.temp_trend}</Cell>
                        <Cell>{observations.wind_speed}</Cell>
                        <Cell>{observations.wind_dir}</Cell>
                        <Cell>{observations.sky}</Cell>
                        <Cell>{observations.precip}</Cell>
                    </t.Row>
                </t.TBody>
            </t.Table>
            <Comment title="Weather Comment">{comment}</Comment>
        </Section>
    )
}

function Snowpack({ observations, comment }) {
    return (
        <Section title="Snowpack">
            <t.Table>
                <t.Header>
                    <t.Row>
                        <t.HeaderCell>Snowpack</t.HeaderCell>
                        <t.HeaderCell>24hr Snow</t.HeaderCell>
                        <t.HeaderCell>Storm Snow</t.HeaderCell>
                        <t.HeaderCell>Storm Date</t.HeaderCell>
                    </t.Row>
                </t.Header>
                <t.TBody>
                    <t.Row>
                        <Cell suffix="cm">{observations.hs}</Cell>
                        <Cell suffix="cm">{observations.hn24}</Cell>
                        <Cell suffix="cm">{observations.hst}</Cell>
                        <Cell suffix="cm">{observations.hst_reset}</Cell>
                    </t.Row>
                </t.TBody>
            </t.Table>
            <Comment title="Snowpack Comment">{comment}</Comment>
        </Section>
    )
}

function Documents({ docs }) {
    const rows = docs.map((d, i) => (
        <t.Row key={i}>
            <t.Cell>{d.date}</t.Cell>
            <t.Cell>{d.title}</t.Cell>
            <t.Cell>{d.source}</t.Cell>
            <t.Cell>
                <a href={incidentsBaseUrl + d.url} target={d.title}>
                    view
                </a>
            </t.Cell>
        </t.Row>
    ))

    return (
        <Section title="Documents">
            {rows.length === 0 ? (
                <Muted>No documents available.</Muted>
            ) : (
                <t.Table>
                    <t.Header>
                        <t.Row>
                            <t.HeaderCell>Document Date</t.HeaderCell>
                            <t.HeaderCell>Title</t.HeaderCell>
                            <t.HeaderCell>Source</t.HeaderCell>
                            <t.HeaderCell />
                        </t.Row>
                    </t.Header>
                    <t.TBody>{rows}</t.TBody>
                </t.Table>
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
        <t.Cell>
            {children ? [children, suffix].filter(Boolean).join(' ') : '-'}
        </t.Cell>
    )
}

// Utils
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
