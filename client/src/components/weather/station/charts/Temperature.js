import React from 'react'
import {Line, VictoryLabel, VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryContainer, VictoryTooltip} from 'victory'
import {formatHours, formatForUnit, scatterEvents} from '../utils'
import theme from './theme'
import moment from 'moment'

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
            }
        }
    },
    axis: {
        axis: {
            stroke: 'transparent',
        },
    },
    dependentAxis: {
        axisLabel: {
            padding: 37
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
            strokeWidth(t) {
                return t === 0 ? 2 : 1
            },
            stroke(t) {
                return t === 0 ? theme.axis.style.axis.stroke : theme.axis.style.grid.stroke(t)
            },
        },
    },
}

function computeDomain(data) {
    const numbers = data.map(m => m.airTempAvg)
    const min = Math.min(...numbers)
    const max = Math.max(...numbers)

    return [Math.min(Math.floor(min / 10) * 10, -20), Math.max(Math.ceil(max / 10) * 10, 10)]
}

function getLabels({x, y, utcOffset}) {
    return `${y} °C\n${moment(x).utcOffset(utcOffset).format('dddd, MMMM Do, HH[h]')}`
}

function dy({y}) {
    return y < 0 ? 20 : 0
}

export default function Temperature({data, min, max, width, height}) {
    const container = <VictoryContainer title='Air temperature' desc={`Air temperature in degree Celcius (°C) every hour from ${min} to ${max}.`} />
    const domain = computeDomain(data)

    return (
        <VictoryChart width={width} height={height} theme={theme} domainPadding={{x: 25}} >
            <VictoryAxis scale='time' tickFormat={formatHours} orientation='bottom' offsetY={50} style={STYLE.axis} />
            <VictoryAxis dependentAxis scale='linear' crossAxis={false} scale='linear' domain={domain} label='Temperature (°C)' style={STYLE.dependentAxis} />
            <VictoryLine data={data} x='measurementDateTime' y='airTempAvg' style={STYLE.avg.line} />
            <VictoryScatter data={data} x='measurementDateTime' y='airTempAvg' labels={getLabels} labelComponent={<VictoryTooltip dy={dy} />} events={scatterEvents} style={STYLE.avg.scatter} />
        </VictoryChart>
    )
}
