import React from 'react'
import {Point, VictoryLabel, VictoryLine, VictoryBar, VictoryChart, VictoryScatter, VictoryAxis, VictoryContainer, VictoryTooltip} from 'victory'
import {PRIMARY, SECONDARY} from 'constants/colors'
import {formatHours, formatForUnit} from '../utils'
import {toCompass} from 'utils/degrees'
import theme from './theme'

const STYLE = {
    gust: {
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
    },
    avg: {
        scatter: {
            data: {
                stroke: PRIMARY,
                fill: 'white',
                strokeWidth: 2,
            }
        },
        line: {
            data: {
                stroke: PRIMARY,
            },
        },
    },
    arrow: {
        textAnchor: 'middle',
        stroke: PRIMARY,
        strokeWidth: 2,
        pointerEvents: 'none',
    },
}

function Arrow({x, y, datum, events, style, ...rest}) {
    return (
        <g {...events} transform={`translate(${x}, ${y}) rotate(${datum.windDirAvg})`}>
            <text dy={3} style={STYLE.arrow}>↑</text>
        </g>
    )
}

function getLabels({windSpeedAvg, windDirAvg}) {
    return `${windSpeedAvg} km/h\n${windDirAvg} °\n${toCompass(windDirAvg)}`
}

export default function Wind({data, min, max, width, height}) {
    const container = <VictoryContainer title='Wind speed and direction' desc={`Wind speed in kilometre per hour (km/h) and direction in degree (°) every hour from ${min} to ${max}.`} />
    const withCompass = width > 450

    return (
        <VictoryChart width={width} height={height} theme={theme} domainPadding={25} containerComponent={container} >
            <VictoryAxis scale='time' tickFormat={formatHours} />
            <VictoryAxis dependentAxis label='Speed (km/h)' style={{axisLabel: {padding: 35}}} />
            <VictoryLine data={data} x='measurementDateTime' y='windSpeedAvg' style={STYLE.avg.line} label='Average' labelComponent={<VictoryLabel dx={withCompass ? 5 : undefined} />} />
            <VictoryScatter data={data} x='measurementDateTime' y='windSpeedAvg' style={STYLE.avg.scatter} labels={getLabels} dataComponent={<Point size={withCompass ? 10 : undefined} />} labelComponent={<VictoryTooltip />} />
            {withCompass && <VictoryScatter data={data} x='measurementDateTime' y='windSpeedAvg' dataComponent={<Arrow />} />}
            <VictoryLine data={data} x='measurementDateTime' y='windSpeedGust' style={STYLE.gust.line} label='Gust' />
            <VictoryScatter data={data} x='measurementDateTime' y='windSpeedGust' style={STYLE.gust.scatter} />
        </VictoryChart>
    )
}
