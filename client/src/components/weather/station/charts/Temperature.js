import React from 'react'
import {VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryContainer, VictoryTooltip} from 'victory'
import {PRIMARY, SECONDARY} from 'constants/colors'
import {formatHours, formatForUnit, scatterEvents} from '../utils'
import theme from './theme'

const STYLE = {
    min: {
        line: {
            data: {
                stroke: PRIMARY,
            },
        },
        scatter: {
            data: {
                stroke: PRIMARY,
                fill: 'white',
                strokeWidth: 2,
            }
        }
    },
    max: {
        line: {
            data: {
                stroke: SECONDARY,
            },
        },
        scatter: {
            data: {
                stroke: SECONDARY,
                fill: 'white',
                strokeWidth: 2,
            }
        }
    },
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
    }
}

function getLabels({y}) {
    return `${y} km/h`
}

export default function Temperature({data, min, max, width, height}) {
    const container = <VictoryContainer title='Air temperature' desc={`Air temperature in degree Celcius (°C) every hour from ${min} to ${max}.`} />

    return (
        <VictoryChart width={width} height={height} theme={theme} domainPadding={25}>
            <VictoryAxis scale='time' tickFormat={formatHours} />
            <VictoryAxis dependentAxis label='Temperature (°C)' style={{axisLabel: {padding: 37}}} />
            <VictoryLine data={data} x='measurementDateTime' y='airTempMin' style={STYLE.min.line} label='Minimum' />
            <VictoryLine data={data} x='measurementDateTime' y='airTempMax' style={STYLE.max.line} label='Maximum' />
            <VictoryLine data={data} x='measurementDateTime' y='airTempAvg' style={STYLE.avg.line} label='Average' />
            <VictoryScatter data={data} x='measurementDateTime' y='airTempMin' labels={getLabels} labelComponent={<VictoryTooltip />} events={scatterEvents} style={STYLE.min.scatter} />
            <VictoryScatter data={data} x='measurementDateTime' y='airTempMax' labels={getLabels} labelComponent={<VictoryTooltip />} events={scatterEvents} style={STYLE.max.scatter} />
            <VictoryScatter data={data} x='measurementDateTime' y='airTempAvg' labels={getLabels} labelComponent={<VictoryTooltip />} events={scatterEvents} style={STYLE.avg.scatter} />
        </VictoryChart>
    )
}
