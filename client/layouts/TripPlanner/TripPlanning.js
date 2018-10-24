import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/is_same_day'
import { Forecast } from 'containers/forecast'
import { Muted } from 'components/text'
import { Day } from 'components/time'
import Shim from 'components/Shim'
import { Chart } from 'components/graphics/avaluator'
import { LEVELS, NO_RATING } from 'constants/forecast/rating'
import { Control, ControlSet } from 'components/form'
import { Dropdown } from 'components/controls/Dropdown'
import { Option } from 'components/controls/options'
import ChartLegend from './panels/ChartLegend'
import MapLegend from './panels/MapLegend'
import { Help } from './panels/Welcome'
import ELEVATIONS, {
    ALP,
    Texts as ElevationTexts,
} from 'constants/forecast/elevation'
import { SIMPLE, CHALLENGING, COMPLEX } from 'constants/forecast/ates'

export default class TripPlanning extends Component {
    static propTypes = {
        region: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        area: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            rating: PropTypes.oneOf([SIMPLE, CHALLENGING, COMPLEX]).isRequired,
        }),
        elevation: PropTypes.oneOf(Array.from(ELEVATIONS)),
        onElevationChange: PropTypes.func.isRequired,
        date: PropTypes.instanceOf(Date),
        onDateChange: PropTypes.func.isRequired,
    }
    static defaultProps = {
        elevation: ALP,
    }
    renderContent(forecast) {
        const { region, ...props } = this.props

        return <Content {...props} forecast={forecast} />
    }
    renderChildren({ loading, data }) {
        const hasDangerRatings = data && data.dangerRatings

        return (
            <Fragment>
                <div style={CONTENT_STYLE}>
                    {loading ? (
                        <Muted>Loading avalanche forecast...</Muted>
                    ) : hasDangerRatings ? (
                        this.renderContent(data)
                    ) : null}
                </div>
                {hasDangerRatings ? <ChartLegend /> : null}
                <MapLegend />
            </Fragment>
        )
    }
    get isLoadedMessage() {
        return (
            <Fragment>
                <p>
                    No danger ratings are available to run the TripPlanner in
                    that area.
                </p>
                <p>
                    Avalanche Forecast are not produce for every regions, in
                    some cases they are available externally.
                </p>
            </Fragment>
        )
    }
    render() {
        const { region } = this.props

        return (
            <Fragment>
                {region && region.id !== 'north-rockies' ? (
                    <Forecast name={region.id}>
                        {props => this.renderChildren(props)}
                    </Forecast>
                ) : (
                    <Shim horizontal>
                        <Muted>{this.isLoadedMessage}</Muted>
                    </Shim>
                )}
                <Help />
            </Fragment>
        )
    }
}

class Content extends Component {
    static propTypes = {
        elevation: PropTypes.oneOf(Array.from(ELEVATIONS)).isRequired,
        onElevationChange: PropTypes.func.isRequired,
        date: PropTypes.instanceOf(Date),
        onDateChange: PropTypes.func.isRequired,
        forecast: PropTypes.object.isRequired,
        area: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            rating: PropTypes.oneOf([SIMPLE, CHALLENGING, COMPLEX]).isRequired,
        }),
    }
    get date() {
        return this.props.date || this.props.forecast.dangerRatings[0].date
    }
    get dates() {
        return this.props.forecast.dangerRatings.map(({ date }) => date)
    }
    get activeDangerRatings() {
        const { dangerRatings } = this.props.forecast
        const { dangerRating } = dangerRatings.find(({ date }) =>
            isSameDay(this.date, date)
        )

        return dangerRating
    }
    get danger() {
        const { rating } = this.props.area
        const dangerRatings = this.activeDangerRatings

        if (rating === SIMPLE) {
            const { elevation } = this.props

            return dangerRatings[elevation.toLowerCase()]
        } else {
            return LEVELS[
                Math.max(
                    LEVELS.indexOf(dangerRatings.alp),
                    LEVELS.indexOf(dangerRatings.tln),
                    LEVELS.indexOf(dangerRatings.btl)
                )
            ]
        }
    }
    render() {
        const { danger } = this

        return (
            <Fragment>
                <Form {...this.props} date={this.date} dates={this.dates} />
                {danger === NO_RATING ? (
                    <p>There is no rating available to show the chart.</p>
                ) : (
                    <div style={CHART_STYLE}>
                        <Chart
                            terrain={this.props.area.rating}
                            danger={this.danger}
                        />
                    </div>
                )}
                <p>
                    For trips in Simple terrain, use the elevation specific
                    danger rating. For trips in Challenging and Complex terrain,
                    use the highest danger rating from the applicable day’s
                    forecast.
                </p>
                <p>
                    Remember to verify all information used during the trip
                    planning stage at the trail head. Confirm that the trip
                    decision is still within the comfort zone and skill level of
                    your group.
                </p>
            </Fragment>
        )
    }
}

class Form extends Component {
    static propTypes = {
        elevation: PropTypes.oneOf(Array.from(ELEVATIONS)).isRequired,
        onElevationChange: PropTypes.func.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        onDateChange: PropTypes.func.isRequired,
        dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    }
    handleDateChange = time => {
        this.props.onDateChange(new Date(time))
    }
    render() {
        const { elevation, onElevationChange, date, dates } = this.props

        return (
            <ControlSet>
                <Control horizontal>
                    <label style={LABEL_STYLE}>Day</label>
                    <Dropdown
                        onChange={this.handleDateChange}
                        value={date.getTime()}
                        style={INPUT_STYLE}>
                        {dates.map((date, index) => (
                            <Option key={index} value={date.getTime()}>
                                <Day value={date} />
                            </Option>
                        ))}
                    </Dropdown>
                </Control>
                <Control horizontal>
                    <label style={LABEL_STYLE}>Elevation</label>
                    <Dropdown
                        onChange={onElevationChange}
                        value={elevation}
                        style={INPUT_STYLE}>
                        {Array.from(ElevationTexts).map(([value, text]) => (
                            <Option key={value} value={value}>
                                {text}
                            </Option>
                        ))}
                    </Dropdown>
                </Control>
            </ControlSet>
        )
    }
}

// Constants
const CONTENT_STYLE = {
    margin: '0 1em',
}
const CHART_STYLE = {
    margin: '1em 0',
}
const INPUT_STYLE = {
    flex: 0.75,
}
const LABEL_STYLE = {
    flex: 0.25,
    color: 'grey',
    marginRight: '1em',
}
