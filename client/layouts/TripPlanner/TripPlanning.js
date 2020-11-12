import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/is_same_day'
import { useProduct } from 'hooks/async/api/products'
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
import ELEVATIONS, { ALP, useTexts } from 'constants/forecast/elevation'
import { SIMPLE, CHALLENGING, COMPLEX } from 'constants/forecast/ates'
import { FormattedMessage } from 'react-intl'
import { Generic } from 'prismic/layouts'

export default class TripPlanning extends Component {
    static propTypes = {
        region: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        zone: PropTypes.shape({
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
    renderChildren({ pending, data }) {
        const hasDangerRatings = data && data.dangerRatings

        return (
            <Fragment>
                <div style={CONTENT_STYLE}>
                    {pending ? (
                        <Muted>
                            <FormattedMessage defaultMessage="Loading avalanche forecast..." />
                        </Muted>
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
                    <FormattedMessage
                        description="Layout TripPlanner/TripPlanning"
                        defaultMessage="No danger ratings are available to run the TripPlanner in that zone."
                    />
                </p>
                <p>
                    <FormattedMessage
                        description="Layout TripPlanner/TripPlanning"
                        defaultMessage="Avalanche Forecast are not produce for every region, in some cases they are available externally."
                    />
                </p>
            </Fragment>
        )
    }
    render() {
        const { region } = this.props

        return (
            <Fragment>
                {region ? (
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

// TODO Cleanup and removed that component
function Forecast({ name, children }) {
    const [data, pending] = useProduct(name)

    return children({ data, pending })
}

class Content extends Component {
    static propTypes = {
        elevation: PropTypes.oneOf(Array.from(ELEVATIONS)).isRequired,
        onElevationChange: PropTypes.func.isRequired,
        date: PropTypes.instanceOf(Date),
        onDateChange: PropTypes.func.isRequired,
        forecast: PropTypes.object.isRequired,
        zone: PropTypes.shape({
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
        const { rating } = this.props.zone
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
                    <Muted>
                        <FormattedMessage
                            description="Layout TripPlanner/TripPlanning"
                            defaultMessage="There is no rating available to show the chart."
                        />
                    </Muted>
                ) : (
                    <div style={CHART_STYLE}>
                        <Chart
                            terrain={this.props.zone.rating}
                            danger={this.danger}
                        />
                    </div>
                )}
                <Generic uid="trip-planner-interpretion-and-explanation" />
            </Fragment>
        )
    }
}

Form.propTypes = {
    elevation: PropTypes.oneOf(Array.from(ELEVATIONS)).isRequired,
    onElevationChange: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onDateChange: PropTypes.func.isRequired,
    dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
}

function Form({ elevation, onElevationChange, onDateChange, date, dates }) {
    const elevationTexts = useTexts()
    function handleDateChange(time) {
        onDateChange(new Date(time))
    }

    return (
        <ControlSet>
            <Control horizontal>
                <label style={LABEL_STYLE}>
                    <FormattedMessage
                        description="Layout TripPlanner/TripPlanning"
                        defaultMessage="Day"
                    />
                </label>
                <Dropdown
                    onChange={handleDateChange}
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
                <label style={LABEL_STYLE}>
                    <FormattedMessage
                        description="Layout TripPlanner/TripPlanning"
                        defaultMessage="Elevation"
                    />
                </label>
                <Dropdown
                    onChange={onElevationChange}
                    value={elevation}
                    style={INPUT_STYLE}>
                    {Array.from(elevationTexts, ([value, text]) => (
                        <Option key={value} value={value}>
                            {text}
                        </Option>
                    ))}
                </Dropdown>
            </Control>
        </ControlSet>
    )
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
