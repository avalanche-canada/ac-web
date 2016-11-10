import React from 'react'
import {VictoryTooltip, VictoryBar, VictoryChart, VictoryAxis, VictoryContainer} from 'victory'
import {PRIMARY, SECONDARY} from 'constants/colors'
import {formatHours, formatForUnit, barEvents} from '../utils'
import moment from 'moment'
import theme from './theme'

const STYLE = {
    data: {
        fill: PRIMARY,
        width: 12,
    }
}
function getLabels({x, y}) {
    return `${y} cm\n${moment(x).format('ddd MMMM Do, HH[h]')}`
}

export default function SnowHeight({data, min, max, width, height}) {
    const container = <VictoryContainer title='Snow Height' desc={`Show height in centimeter (cm) every hour from ${min} to ${max}.`} />

     return (
        <VictoryChart theme={theme} width={width} height={height} domainPadding={25} containerComponent={container}>
            <VictoryAxis scale='time' tickFormat={formatHours} />
            <VictoryAxis dependentAxis label='Height (cm)' style={{axisLabel: {padding: 35}}} />
            <VictoryBar data={data} x='measurementDateTime' y='snowHeight' events={barEvents} style={STYLE} labels={getLabels} labelComponent={<VictoryTooltip />} />
        </VictoryChart>
    )
}
