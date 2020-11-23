import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/is_same_day'
import { useForecast } from 'hooks/async/api/products'
import { Muted } from 'components/text'
import { Day } from 'components/time'
import Shim from 'components/Shim'
import { Chart } from 'components/graphics/avaluator'
import { LEVELS, NO_RATING } from 'constants/products/forecast/rating'
import { Control, ControlSet } from 'components/form'
import { Dropdown } from 'components/controls/Dropdown'
import { Option } from 'components/controls/options'
import ChartLegend from './panels/ChartLegend'
import MapLegend from './panels/MapLegend'
import { Help } from './panels/Welcome'
import Elevations, { ALP, useTexts } from 'constants/products/forecast/elevation'
import Ates, { SIMPLE } from 'constants/products/forecast/ates'
import { FormattedMessage } from 'react-intl'
import { Generic } from 'prismic/layouts'
import * as Async from 'contexts/async'

TripPlanning.propTypes = {
    region: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    zone: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.oneOf(Array.from(Ates)).isRequired,
    }),
    elevation: PropTypes.oneOf(Array.from(Elevations)),
    onElevationChange: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
}

TripPlanning.defaultProps = {
    elevation: ALP,
}

export default function TripPlanning(props) {
    const { region } = props

    return (
        <Fragment>
            {region ? <Forecast id={region.id} {...props} /> : <NoDangerRatings />}
            <Help />
        </Fragment>
    )
}

// Utils
function Forecast({ id, ...props }) {
    return (
        <Async.Provider value={useForecast(id)}>
            <div style={CONTENT_STYLE}>
                <Async.Pending>
                    <Muted>
                        <FormattedMessage defaultMessage="Loading avalanche forecast..." />
                    </Muted>
                </Async.Pending>
                <Async.Found>
                    <Content {...props} />
                </Async.Found>
            </div>
            <MapLegend />
        </Async.Provider>
    )
}
function NoDangerRatings() {
    return (
        <Shim horizontal>
            <Muted as="p">
                <FormattedMessage
                    description="Layout TripPlanner/TripPlanning"
                    defaultMessage="No danger ratings are available to run the TripPlanner in that zone."
                />
            </Muted>
            <Muted as="p">
                <FormattedMessage
                    description="Layout TripPlanner/TripPlanning"
                    defaultMessage="Avalanche Forecast are not produce for every region, in some cases they are available externally."
                />
            </Muted>
        </Shim>
    )
}
Content.propTypes = {
    elevation: PropTypes.oneOf(Array.from(Elevations)).isRequired,
    onElevationChange: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
    payload: PropTypes.object.isRequired,
    zone: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.oneOf(Array.from(Ates)).isRequired,
    }),
}

function Content({ payload, ...props }) {
    const { dangerRatings } = payload.report

    if (!dangerRatings) {
        return null
    }

    const { zone } = props
    const { elevation } = props
    const date = props.date || new Date(dangerRatings[0].date.value)
    const dates = dangerRatings.map(ratings => new Date(ratings.date.value))
    const { ratings } = dangerRatings.find((_, index) => isSameDay(date, dates[index]))
    const danger =
        zone.rating === SIMPLE
            ? ratings[elevation.toLowerCase()].rating.value
            : LEVELS[
                  Math.max(
                      LEVELS.indexOf(ratings.alp.rating.value),
                      LEVELS.indexOf(ratings.tln.rating.value),
                      LEVELS.indexOf(ratings.btl.rating.value)
                  ) + 1
              ]

    return (
        <Fragment>
            <Form {...props} date={date} dates={dates} />
            {danger === NO_RATING ? (
                <Muted>
                    <FormattedMessage
                        description="Layout TripPlanner/TripPlanning"
                        defaultMessage="There is no rating available to show the chart."
                    />
                </Muted>
            ) : (
                <div style={CHART_STYLE}>
                    <Chart terrain={zone.rating} danger={danger} />
                </div>
            )}
            <Generic uid="trip-planner-interpretion-and-explanation" />
            <ChartLegend />
        </Fragment>
    )
}

Form.propTypes = {
    elevation: PropTypes.oneOf(Array.from(Elevations)).isRequired,
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
                <Dropdown onChange={handleDateChange} value={date.getTime()} style={INPUT_STYLE}>
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
                <Dropdown onChange={onElevationChange} value={elevation} style={INPUT_STYLE}>
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
