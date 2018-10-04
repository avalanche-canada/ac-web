import React, { PureComponent, Fragment } from 'react'
import { Link } from '@reach/router'
import * as t from 'components/table'
import Pagination from 'components/pagination'
import { DropdownFromOptions } from 'components/controls'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import format from 'date-fns/format'
import { incidentsBaseUrl } from 'api/config'
import styles from './incidents.css'

export class IncidentTable extends PureComponent {
    renderRow({
        date,
        location,
        location_province,
        group_activity,
        num_involved,
        num_injured,
        num_fatal,
        id,
    }) {
        return (
            <t.Row>
                <t.Cell>
                    <span className={styles.DateCell}>{date}</span>
                </t.Cell>
                <t.Cell>{location}</t.Cell>
                <t.Cell>{dash(location_province)}</t.Cell>
                <t.Cell>{group_activity}</t.Cell>
                <t.Cell>{dash(num_involved)}</t.Cell>
                <t.Cell>{dash(num_injured)}</t.Cell>
                <t.Cell>{dash(num_fatal)}</t.Cell>
                <t.Cell>
                    <Link to={id}>view</Link>
                </t.Cell>
            </t.Row>
        )
    }
    render() {
        const { onFilterChange, page, onPageChange, filters = {} } = this.props
        const { results, count } = this.props.data
        const pageCount = count / 50

        return (
            <Fragment>
                <IncidentFilters
                    values={{
                        from: filters.from,
                        to: filters.to,
                    }}
                    onChange={onFilterChange}
                />
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
                    <t.TBody>{results.map(this.renderRow)}</t.TBody>
                </t.Table>
                <Pagination
                    total={pageCount}
                    active={page}
                    onChange={onPageChange}
                />
            </Fragment>
        )
    }
}

export class IncidentFilters extends PureComponent {
    handleChangeFrom = fromSeason =>
        this.props.onChange({ from: fromSeason, to: this.props.values.to })
    handleChangeTo = toSeason =>
        this.props.onChange({ from: this.props.values.from, to: toSeason })
    render() {
        // Remove last filter year ( most recent ) as it results in an empty "TO" list and no elements
        // Validate this works when there are entries for this year
        const f = FILTERS.slice(0, FILTERS.length - 1)
        const froms = new Map(
            f
                .filter(f => startsBefore(f, this.props.values.to))
                .map(f => [f.season, f.title])
        )
        const tos = new Map(
            FILTERS.filter(f => startsAfter(f, this.props.values.from)).map(
                f => [f.season, f.title]
            )
        )
        return (
            <div className={styles.Filters}>
                <div>
                    <label>From:</label>
                    <DropdownFromOptions
                        onChange={this.handleChangeFrom}
                        value={this.props.values.from}
                        placeholder="From"
                        options={froms}
                    />
                </div>
                <div>
                    <label>To:</label>
                    <DropdownFromOptions
                        onChange={this.handleChangeTo}
                        value={this.props.values.to}
                        placeholder="To"
                        options={tos}
                    />
                </div>
            </div>
        )
    }
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
            <Weather weather={weather_obs} weatherComment={weather_comment} />
            <Snowpack
                snowpack={snowpack_obs}
                snowpackComment={snowpack_comment}
            />
            <Documents docs={documents} />
        </article>
    )
}

function Summary({ incident }) {
    return (
        <section>
            <h2>Incident Summary</h2>
            <table className={styles.SummaryTable}>
                <tbody>
                    <SummaryValue name="Date">{incident.ob_date}</SummaryValue>
                    <SummaryValue name="Location">
                        {incident.location}
                    </SummaryValue>
                    <SummaryValue name="Location Description">
                        {incident.location_desc}
                    </SummaryValue>
                    <SummaryValue name="Province">
                        {incident.location_province}
                    </SummaryValue>
                    <SummaryValue name="Coordinates">
                        {latLng(incident.location_coords)}
                    </SummaryValue>
                    <SummaryValue name="Elevation" suffix="m">
                        {incident.location_elevation}
                    </SummaryValue>
                    <SummaryValue name="Activity">
                        {incident.group_activity}
                    </SummaryValue>
                    <SummaryValue name="Involvement">
                        {incident.num_involved}
                    </SummaryValue>
                    <SummaryValue name="Injury">
                        {incident.num_injured}
                    </SummaryValue>
                    <SummaryValue name="Fatality">
                        {incident.num_fatal}
                    </SummaryValue>
                    <SummaryValue name="Description">
                        {incident.comment}
                    </SummaryValue>
                </tbody>
            </table>
        </section>
    )
}

function SummaryValue({ name, children, suffix }) {
    return (
        <tr>
            <th>{name}</th>
            <td>
                {children ? [children, suffix].filter(Boolean).join(' ') : '-'}
            </td>
        </tr>
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

function Weather({ weather, weatherComment }) {
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
                        <Cell>{weather.temp_pressent}</Cell>
                        <Cell>{weather.temp_max}</Cell>
                        <Cell>{weather.temp_min}</Cell>
                        <Cell>{weather.temp_trend}</Cell>
                        <Cell>{weather.wind_speed}</Cell>
                        <Cell>{weather.wind_dir}</Cell>
                        <Cell>{weather.sky}</Cell>
                        <Cell>{weather.precip}</Cell>
                    </t.Row>
                </t.TBody>
            </t.Table>
            {weatherComment && (
                <p>
                    <b>Weather Comment:</b> {weatherComment}
                </p>
            )}
        </Section>
    )
}

function Snowpack({ snowpack, snowpackComment }) {
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
                        <Cell suffix="cm">{snowpack.hs}</Cell>
                        <Cell suffix="cm">{snowpack.hn24}</Cell>
                        <Cell suffix="cm">{snowpack.hst}</Cell>
                        <Cell suffix="cm">{snowpack.hst_reset}</Cell>
                    </t.Row>
                </t.TBody>
            </t.Table>
            {snowpackComment && (
                <p>
                    <b>Snowpack Comment:</b> {snowpackComment}
                </p>
            )}
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

function Cell({ children, suffix }) {
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
function dash(value) {
    return value || '-'
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
    var end = getYear(now)

    if (getMonth(now) < 6) {
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
