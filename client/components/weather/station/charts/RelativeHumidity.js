import React from 'react'
import PropTypes from 'prop-types'
import {
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

const STYLE = {
    scatter: {
        data: {
            stroke: 'purple',
            fill: 'white',
            strokeWidth: 2,
        },
    },
    line: {
        data: {
            stroke: 'purple',
        },
    },
    axis: {
        axisLabel: {
            padding: 35,
        },
        tickLabels: {
            fill(t) {
                if (t % 20 === 0) {
                    return theme.axis.style.tickLabels.fill
                } else {
                    return 'transparent'
                }
            },
        },
        grid: {
            strokeDasharray(t) {
                if (t % 20 === 0) {
                    return theme.axis.style.grid.strokeDasharray
                } else if (t % 10 === 0) {
                    return '1, 5'
                }
            },
        },
    },
}

function getLabels({ x, y, utcOffset }) {
    return `${y} %\n${format(setUTCOffset(x, utcOffset), 'dddd, MMMM D, HH[h]')}`
}

RelativeHumidity.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default function RelativeHumidity({ data, min, max, width, height }) {
    const container = (
        <VictoryContainer
            title="Relative humidity"
            desc={`Relative humidity (%) every hour from ${min} to ${max}.`}
        />
    )

    if (!shouldShowGraph(data, 'relativeHumidity')) {
        return null
    }

    const humidData = filterDataset(data, 'relativeHumidity')

    return (
        <div>
            <h2>Relative Humidity</h2>
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
                    domain={[0, 100]}
                    label="Relative humidity (%)"
                    tickValues={range(0, 101, 10)}
                    style={STYLE.axis}
                />
                <VictoryLine
                    data={humidData}
                    x="measurementDateTime"
                    style={STYLE.line}
                    y="relativeHumidity"
                />
                <VictoryScatter
                    data={humidData}
                    x="measurementDateTime"
                    y="relativeHumidity"
                    labels={getLabels}
                    labelComponent={<VictoryTooltip />}
                    events={scatterEvents}
                    style={STYLE.scatter}
                />
            </VictoryChart>
        </div>
    )
}
