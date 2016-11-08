import React from 'react'
import {VictoryLine, VictoryBar, VictoryChart, VictoryScatter, VictoryAxis, VictoryContainer, VictoryTooltip} from 'victory'
import {PRIMARY, SECONDARY} from 'constants/colors'
import {formatHours, formatForUnit, scatterEvents} from '../utils'
import theme from './theme'

const STYLE = {
    scatter: {
        data: {
            stroke: SECONDARY,
            fill: 'white',
            strokeWidth: 2,
        }
    },
    line: {
        data: {
            stroke: SECONDARY,
        },
    },
}

function getLabels({y}) {
    return `${y} %`
}

export default function RelativeHumidity({data, min, max, width, height}) {
    const container = <VictoryContainer title='Relative humidity' desc={`Relative humidity (%) every hour from ${min} to ${max}.`} />

    return (
        <VictoryChart width={width} height={height} theme={theme} domainPadding={25} containerComponent={container} >
            <VictoryAxis scale='time' tickFormat={formatHours} />
            <VictoryAxis dependentAxis label='Relative humidity (%)' style={{axisLabel: {padding: 35}}} />
            <VictoryLine data={data} x='measurementDateTime' style={STYLE.line} y='relativeHumidity' />
            <VictoryScatter data={data} x='measurementDateTime' y='relativeHumidity' labels={getLabels} labelComponent={<VictoryTooltip />} events={scatterEvents} style={STYLE.scatter} />
        </VictoryChart>
    )
}
