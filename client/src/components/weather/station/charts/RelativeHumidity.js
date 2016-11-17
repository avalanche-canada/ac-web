import React from 'react'
import {VictoryLine, VictoryBar, VictoryChart, VictoryScatter, VictoryAxis, VictoryContainer, VictoryTooltip} from 'victory'
import {formatHours, formatForUnit, scatterEvents} from '../utils'
import moment from 'moment'
import theme from './theme'
import range from 'lodash/range'

const STYLE = {
    scatter: {
        data: {
            stroke: 'purple',
            fill: 'white',
            strokeWidth: 2,
        }
    },
    line: {
        data: {
            stroke: 'purple',
        },
    },
    axis: {
        axisLabel: {
            padding: 35
        },
        tickLabels: {
            fill(t) {
                if (t % 20 === 0) {
                    return theme.axis.style.tickLabels.fill
                } else {
                    return 'transparent'
                }
            }
        },
        grid: {
            strokeDasharray(t) {
                if (t % 20 === 0) {
                    return theme.axis.style.grid.strokeDasharray
                } else if (t % 10 === 0) {
                    return '1, 5'
                }
            }
        },
    }
}

function getLabels({x, y, utcOffset}) {
    return `${y} %\n${moment(x).utcOffset(utcOffset).format('dddd, MMMM Do, HH[h]')}`
}

export default function RelativeHumidity({data, min, max, width, height}) {
    const container = <VictoryContainer title='Relative humidity' desc={`Relative humidity (%) every hour from ${min} to ${max}.`} />

    return (
        <VictoryChart width={width} height={height} theme={theme} containerComponent={container} domainPadding={{x: 25}} >
            <VictoryAxis scale='time' tickFormat={formatHours}/>
            <VictoryAxis dependentAxis scale='linear' domain={[0, 100]} label='Relative humidity (%)' tickValues={range(0, 101, 10)} style={STYLE.axis} />
            <VictoryLine data={data} x='measurementDateTime' style={STYLE.line} y='relativeHumidity' />
            <VictoryScatter data={data} x='measurementDateTime' y='relativeHumidity' labels={getLabels} labelComponent={<VictoryTooltip />} events={scatterEvents} style={STYLE.scatter} />
        </VictoryChart>
    )
}
