import React from 'react'
import PropTypes from 'prop-types'
import {
    Point,
    VictoryLabel,
    VictoryLine,
    VictoryChart,
    VictoryScatter,
    VictoryAxis,
    VictoryContainer,
    VictoryTooltip,
} from 'victory'
import { formatHours, scatterEvents } from '../utils'
import format from 'date-fns/format'
import { setUTCOffset } from 'utils/date'
import theme from './theme'
import range from 'lodash/range'
import { filterDataset, shouldShowGraph } from './filters'
import { useIntl } from 'react-intl'
import { DATETIME } from 'constants/intl'

Wind.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default function Wind({ data, min, max, width, height }) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component weather/station/charts/Wind',
        defaultMessage: 'Wind speed and direction',
    })
    const desc = intl.formatMessage(
        {
            description: 'Component weather/station/charts/Wind',
            defaultMessage:
                'Wind speed in kilometre per hour (km/h) and direction in degree (°) every hour from {min, date} to {max, date}.',
        },
        { min, max }
    )
    const label = intl.formatMessage({
        description: 'Component weather/station/charts/Wind',
        defaultMessage: 'Speed (km/h)',
    })
    const container = <VictoryContainer title={title} desc={desc} />
    const withCompass = width > 475

    const showAvg = shouldShowGraph(data, 'windSpeedAvg')
    const showGust = shouldShowGraph(data, 'windSpeedGust')

    if (!(showAvg || showGust)) {
        return null
    }

    const avgData = filterDataset(data, 'windSpeedAvg')
    const gustData = filterDataset(data, 'windSpeedGust')
    const domain = computeDomain(data)

    function getSpeedAndDirectionLabels({
        x,
        windSpeedAvg,
        windDirAvg,
        windDirCompass,
        utcOffset,
    }) {
        const speed = intl.formatNumber(windSpeedAvg, {
            style: 'unit',
            unit: 'kilometer-per-hour',
        })
        const direction = intl.formatNumber(windDirAvg, {
            style: 'unit',
            unit: 'degree',
        })
        const date = intl.formatDate(setUTCOffset(x, utcOffset), DATETIME)

        return `${speed}\n${direction} (${windDirCompass})\n${date}`
    }

    function getLabels({ x, y, utcOffset }) {
        const speed = intl.formatNumber(y, {
            style: 'unit',
            unit: 'kilometer-per-hour',
        })
        const date = intl.formatDate(setUTCOffset(x, utcOffset), DATETIME)

        return `${speed}\n${date}`
    }

    return (
        <div>
            <h2>{title}</h2>
            <VictoryChart
                width={width}
                height={height}
                theme={theme}
                containerComponent={container}
                domainPadding={{ x: 25 }}>
                <VictoryAxis scale="time" tickFormat={formatHours} />
                <VictoryAxis
                    dependentAxis
                    scale="linear"
                    domain={domain}
                    tickValues={range(domain[0], ++domain[1], 25)}
                    label={label}
                    style={STYLE.axis}
                />
                {showAvg && (
                    <VictoryLine
                        data={avgData}
                        x="measurementDateTime"
                        y="windSpeedAvg"
                        style={STYLE.avg.line}
                        label="Average"
                        labelComponent={
                            <VictoryLabel dx={withCompass ? 5 : undefined} />
                        }
                    />
                )}
                {showAvg && (
                    <VictoryScatter
                        data={avgData}
                        x="measurementDateTime"
                        y="windSpeedAvg"
                        style={STYLE.avg.scatter}
                        labels={getSpeedAndDirectionLabels}
                        events={scatterEvents}
                        dataComponent={
                            <Point size={withCompass ? 10 : undefined} />
                        }
                        labelComponent={<VictoryTooltip />}
                    />
                )}
                {showAvg && withCompass && (
                    <VictoryScatter
                        data={avgData}
                        x="measurementDateTime"
                        y="windSpeedAvg"
                        dataComponent={ARROW}
                    />
                )}
                {showGust && (
                    <VictoryLine
                        data={gustData}
                        x="measurementDateTime"
                        y="windSpeedGust"
                        style={STYLE.gust.line}
                        label="Gust"
                    />
                )}
                {showGust && (
                    <VictoryScatter
                        data={gustData}
                        x="measurementDateTime"
                        y="windSpeedGust"
                        labels={getLabels}
                        labelComponent={<VictoryTooltip />}
                        events={scatterEvents}
                        style={STYLE.gust.scatter}
                    />
                )}
            </VictoryChart>
        </div>
    )
}

const STYLE = {
    gust: {
        scatter: {
            data: {
                stroke: 'orange',
                fill: 'white',
                strokeWidth: 2,
            },
        },
        line: {
            data: {
                stroke: 'orange',
            },
        },
    },
    avg: {
        scatter: {
            data: {
                stroke: 'black',
                fill: 'white',
                strokeWidth: 2,
            },
        },
        line: {
            data: {
                stroke: 'black',
            },
        },
    },
    arrow: {
        textAnchor: 'middle',
        stroke: 'black',
        strokeWidth: 2,
        pointerEvents: 'none',
    },
    axis: {
        axisLabel: {
            padding: 35,
        },
    },
}

// Constants and utils
Arrow.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    datum: PropTypes.object.isRequired,
    events: PropTypes.object,
}

function Arrow({ x, y, datum, events }) {
    return (
        <g
            {...events}
            transform={`translate(${x}, ${y}) rotate(${datum.windDirAvg})`}>
            <text dy={3} style={STYLE.arrow}>
                ↓
            </text>
        </g>
    )
}

const ARROW = <Arrow />

function computeDomain(data) {
    const max = Math.max(
        ...data.map(m => {
            const mm = Math.max(m.windSpeedAvg, m.windSpeedGust)

            return isNaN(mm) ? 0 : mm
        })
    )

    return [0, Math.max(Math.ceil(max / 25) * 25, 100)]
}
