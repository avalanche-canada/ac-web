import React from 'react'
import PropTypes from 'prop-types'
import {
    VictoryLine,
    VictoryChart,
    VictoryScatter,
    VictoryAxis,
    VictoryTooltip,
} from 'victory'
import { FormattedMessage, useIntl } from 'react-intl'
import { formatHours, scatterEvents } from '../utils'
import theme from './theme'
import { setUTCOffset } from 'utils/date'
import { filterDataset, shouldShowGraph } from './filters'
import isFinite from 'lodash/isFinite'
import { DATETIME } from 'constants/intl'

Temperature.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default function Temperature({ data, width, height }) {
    const intl = useIntl()

    if (!shouldShowGraph(data, 'airTempAvg')) {
        return null
    }

    const airTempAvg = filterDataset(data, 'airTempAvg')
    const domain = computeDomain(data)
    const label = intl.formatMessage({
        description: 'Component weather/station/charts/Temperature',
        defaultMessage: 'Temperature (°C)',
    })

    function getLabels({ x, y, utcOffset }) {
        const temperature = intl.formatNumber(y, {
            style: 'unit',
            unit: 'celsius',
            unitDisplay: 'narrow',
        })
        const date = intl.formatDate(setUTCOffset(x, utcOffset), DATETIME)

        return `${temperature}\n${date}`
    }

    return (
        <div>
            <h2>
                <FormattedMessage
                    description="Component weather/station/charts/Temperature"
                    defaultMessage="Air Temperature"
                />
            </h2>
            <VictoryChart
                width={width}
                height={height}
                theme={theme}
                domainPadding={{ x: 25 }}>
                <VictoryAxis
                    scale="time"
                    tickFormat={formatHours}
                    orientation="bottom"
                    offsetY={50}
                />
                <VictoryAxis
                    dependentAxis
                    scale="linear"
                    crossAxis={false}
                    domain={domain}
                    label={label}
                    style={STYLE.dependentAxis(domain)}
                />
                <VictoryLine
                    data={airTempAvg}
                    x="measurementDateTime"
                    y="airTempAvg"
                    style={STYLE.avg.line}
                />
                <VictoryScatter
                    data={airTempAvg}
                    x="measurementDateTime"
                    y="airTempAvg"
                    labels={getLabels}
                    labelComponent={<VictoryTooltip />}
                    events={scatterEvents}
                    style={STYLE.avg.scatter}
                />
            </VictoryChart>
        </div>
    )
}

// Constants and utils
const STYLE = {
    avg: {
        line: {
            data: {
                stroke: 'green',
            },
        },
        scatter: {
            data: {
                stroke: 'green',
                fill: 'white',
                strokeWidth: 2,
            },
        },
    },
    dependentAxis(domain) {
        return {
            axisLabel: {
                padding: 37,
            },
            tickLabels: {
                fill(t) {
                    if (t % 10 === 0) {
                        return theme.axis.style.tickLabels.fill
                    } else {
                        return 'transparent'
                    }
                },
            },
            grid: {
                strokeDasharray(t) {
                    if (t === 0) {
                        return null
                    } else if (t % 10 === 0) {
                        return theme.axis.style.grid.strokeDasharray
                    } else {
                        return '1, 5'
                    }
                },
                stroke(t) {
                    if (t === 0) {
                        return theme.axis.style.axis.stroke
                    } else if (t === domain[0]) {
                        return 'transparent'
                    } else {
                        return theme.axis.style.grid.stroke(t)
                    }
                },
            },
        }
    },
}

function computeDomain(data) {
    const numbers = data.map(m => m.airTempAvg).filter(isFinite)
    const min = Math.min(...numbers)
    const max = Math.max(...numbers)

    return [
        Math.min(Math.floor(min / 10) * 10, -20),
        Math.max(Math.ceil(max / 10) * 10, 10),
    ]
}
