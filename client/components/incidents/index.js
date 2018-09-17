import React, { PureComponent } from 'react'
import { Time } from 'components/time'
import * as t from 'components/table'
import Pagination from 'components/pagination'
import { Loading } from 'components/text'
import styles from './incidents.css'
import { DropdownFromOptions } from 'components/controls'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import format from 'date-fns/format'
import { incidentsBaseUrl } from 'api/config'

//TODO(wnh): is property destructuring only an arrow function thing???
// function IncidentList({status, data}) was not working at all at a

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const ERROR = 'ERROR'

export const IncidentList = ({
    status,
    data,
    page,
    filters,
    onPageChange,
    onFilterChange,
}) => {
    return (
        <div>
            {status === PENDING && <Loading />}
            {status === FULFILLED ? (
                <IncidentTable
                    data={data}
                    page={page}
                    filters={filters}
                    onPageChange={onPageChange}
                    onFilterChange={onFilterChange}
                />
            ) : (
                <div />
            )}
        </div>
    )
}

class IncidentTable extends PureComponent {
    //= ({data, onPageChange, page}) => {
    //
    state = {}

    render() {
        const page_count = this.props.data.count / 50
        //const page_count = Math.ceil(data.count / 50);
        const results = this.props.data.results
        const rows = results.map(inc => {
            return <Row key={inc.id} inc={inc} />
        })

        const filters = this.props.filters || {}
        return (
            <div>
                <IncidentFilters
                    values={{
                        from: filters.from,
                        to: filters.to,
                    }}
                    onChange={this.props.onFilterChange}
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
                    <t.TBody>{rows}</t.TBody>
                </t.Table>
                <Pagination
                    total={page_count}
                    active={this.props.page}
                    onChange={this.props.onPageChange}
                />
            </div>
        )
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

class IncidentFilters extends PureComponent {
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
            <div>
                {/* <div>Filter Seasons:</div> */}

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
            </div>
        )
    }
}
const dash = val => {
    if (val === null || typeof val === 'undefined' || val === '') {
        return '-'
    }
    return val
}

const Row = ({ inc }) => {
    return (
        <t.Row>
            <t.Cell>
                <span className={styles.DateCell}>
                    <Time format="YYYY-MM-DD" value={inc.date} />
                </span>
            </t.Cell>
            <t.Cell>{inc.location}</t.Cell>
            <t.Cell>{dash(inc.location_province)}</t.Cell>
            <t.Cell>{inc.group_activity}</t.Cell>
            <t.Cell>{dash(inc.num_involved)}</t.Cell>
            <t.Cell>{dash(inc.num_injured)}</t.Cell>
            <t.Cell>{dash(inc.num_fatal)}</t.Cell>
            <t.Cell>
                <a href={`/incidents/${inc.id}`}>view</a>
            </t.Cell>
        </t.Row>
    )
}

export const IncidentDetails = ({ status, data }) => {
    return (
        <div>
            {status === PENDING && <Loading />}
            {status === FULFILLED ? <IncPage incident={data} /> : <div />}
        </div>
    )
}

const IncPage = ({ incident }) => {
    return (
        <div>
            <IncSummary incident={incident} />
            <IncAvalanche avalanches={incident.avalanche_obs} />
            <IncWx
                weather={incident.weather_obs}
                weatherComment={incident.weather_comment}
            />
            <IncSnow
                snowpack={incident.snowpack_obs}
                snowpackComment={incident.snowpack_comment}
            />
            <IncDocuments docs={incident.documents} />
        </div>
    )
}

const SummaryVal = ({ name, val, suffix }) => {
    var cell = <td>-</td>
    if (val) {
        cell = (
            <td>
                {val}
                {suffix}
            </td>
        )
    }
    return (
        <tr>
            <th>{name}</th>
            {cell}
        </tr>
    )
}

const IncSummary = ({ incident }) => {
    return (
        <div>
            <h2>Incident Summary</h2>
            <table className={styles.SummaryTable}>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <td>
                            <Time
                                format="YYYY-MM-DD"
                                value={incident.ob_date}
                            />
                        </td>
                    </tr>
                    <SummaryVal name="Location" val={incident.location} />
                    <SummaryVal
                        name="Location Description"
                        val={incident.location_desc}
                    />
                    <SummaryVal
                        name="Province"
                        val={incident.location_province}
                    />
                    {/*
                TODO(wnh): Figure out where this comes from. Needs work in the API
                <SummaryVal name="Mountain Range"       val="TODO" />
            */}
                    <SummaryVal
                        name="Coordinates"
                        val={incident.location_coords}
                    />
                    <SummaryVal
                        name="Elevation"
                        val={incident.location_elevation}
                        suffix="m"
                    />
                    <SummaryVal name="Activity" val={incident.group_activity} />
                    <SummaryVal
                        name="Involvement"
                        val={incident.num_involved}
                    />
                    <SummaryVal name="Injury" val={incident.num_injured} />
                    <SummaryVal name="Fatality" val={incident.num_fatal} />
                    <SummaryVal name="Description" val={incident.comment} />
                </tbody>
            </table>
        </div>
    )
}

const RowVal = ({ val, suffix }) => {
    if (val) {
        return (
            <t.Cell>
                {val}
                {suffix}
            </t.Cell>
        )
    } else {
        return <t.Cell>-</t.Cell>
    }
}

const IncAvalanche = ({ avalanches }) => {
    const rows = avalanches.map((av, i) => (
        <t.Row key={i}>
            <t.Cell>
                <Time format="YYYY-MM-DD HH:mm" value={av.observation_date} />
            </t.Cell>
            <RowVal val={av.size} />
            <RowVal val={av.type} />
            <RowVal val={av.trigger} />
            <RowVal val={av.elevation} suffix="m" />
            <RowVal val={av.aspect} />
            <RowVal val={av.slab_width} suffix="m" />
            <RowVal val={av.slab_thickness} suffix="cm" />
        </t.Row>
    ))

    return (
        <div>
            <h3>Avalanches</h3>
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
        </div>
    )
}

const IncWx = ({ weather, weatherComment }) => {
    const wx = weather
    return (
        <div>
            <h3>Weather</h3>
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
                        <RowVal val={wx.temp_pressent} />
                        <RowVal val={wx.temp_max} />
                        <RowVal val={wx.temp_min} />
                        <RowVal val={wx.temp_trend} />
                        <RowVal val={wx.wind_speed} />
                        <RowVal val={wx.wind_dir} />
                        <RowVal val={wx.sky} />
                        <RowVal val={wx.precip} />
                    </t.Row>
                </t.TBody>
            </t.Table>
            {weatherComment ? (
                <p>
                    <b>Weather Comment:</b> {weatherComment}
                </p>
            ) : (
                <p />
            )}
        </div>
    )
}

const IncSnow = ({ snowpack, snowpackComment }) => {
    const s = snowpack
    return (
        <div>
            <h3>Snowpack</h3>
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
                        <RowVal val={s.hs} suffix="cm" />
                        <RowVal val={s.hn24} suffix="cm" />
                        <RowVal val={s.hst} suffix="cm" />
                        <RowVal val={s.hst_reset} suffix="cm" />
                    </t.Row>
                </t.TBody>
            </t.Table>
            {snowpackComment ? (
                <p>
                    <b>Snowpack Comment:</b> {snowpackComment}
                </p>
            ) : (
                <p />
            )}
        </div>
    )
}

const IncDocuments = ({ docs }) => {
    const rows = docs.map((d, i) => (
        <t.Row key={i}>
            <t.Cell>
                <Time format="YYYY-MM-DD" value={d.date} />
            </t.Cell>
            <t.Cell>{d.title}</t.Cell>
            <t.Cell>{d.source}</t.Cell>
            <t.Cell>
                <a href={incidentsBaseUrl + d.url}>view</a>
            </t.Cell>
        </t.Row>
    ))
    return (
        <div>
            <h3>Documents</h3>
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
        </div>
    )
}
