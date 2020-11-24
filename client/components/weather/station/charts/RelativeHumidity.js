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
import { useIntl } from 'react-intl'
import { formatHours, scatterEvents } from '../utils'
import { setUTCOffset } from 'utils/date'
import theme from './theme'
import range from 'lodash/range'
import { filterDataset, shouldShowGraph } from './filters'
import { DATETIME } from 'constants/intl'

RelativeHumidity.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default function RelativeHumidity({ data, min, max, width, height }) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Component weather/station/charts/RelativeHumidity',
        defaultMessage: 'Relative humidity',
    })
    const desc = intl.formatMessage({
        description: 'Component weather/station/charts/RelativeHumidity',
        defaultMessage: 'Relative humidity (%) every hour from {min} to {max}.',
        values: { min, max },
    })
    const label = intl.formatMessage({
        description: 'Component weather/station/charts/RelativeHumidity',
        defaultMessage: 'Relative humidity (%)',
    })
    const container = <VictoryContainer title={title} desc={desc} />
    function getLabels({ x, y, utcOffset }) {
        const date = intl.formatDate(setUTCOffset(x, utcOffset), DATETIME)
        const humidity = intl.formatNumber(y / 100, {
            style: 'percent',
        })

        return `${humidity}\n${date}`
    }

    if (!shouldShowGraph(data, 'relativeHumidity')) {
        return null
    }

    const humidData = filterDataset(data, 'relativeHumidity')

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
                    domain={[0, 100]}
                    label={label}
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

// Style
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
