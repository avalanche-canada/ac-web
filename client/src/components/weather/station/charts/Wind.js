import React from 'react'
import {Point, VictoryLabel, VictoryLine, VictoryBar, VictoryChart, VictoryScatter, VictoryAxis, VictoryContainer, VictoryTooltip} from 'victory'
import {formatHours, formatForUnit, scatterEvents} from '../utils'
import {toCompass} from '/utils/degrees'
import format from 'date-fns/format'
import {setUTCOffset} from '/utils/date'
import theme from './theme'
import range from 'lodash/range'
import {filterDataset, shouldShowGraph} from './filters'

const STYLE = {
    gust: {
        scatter: {
            data: {
                stroke: 'orange',
                fill: 'white',
                strokeWidth: 2,
            }
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
            }
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
            padding: 35
        }
    },
}

function Arrow({x, y, datum, events, style, ...rest}) {
    return (
        <g {...events} transform={`translate(${x}, ${y}) rotate(${datum.windDirAvg})`}>
            <text dy={3} style={STYLE.arrow}>↓</text>
        </g>
    )
}

const ARROW = <Arrow />

function getSpeedAndDirectionLabels({x, windSpeedAvg, windDirAvg, utcOffset}) {
    return `${windSpeedAvg} km/h\n${windDirAvg} ° (${toCompass(windDirAvg)})\n${format(setUTCOffset(x, utcOffset), 'dddd, MMMM D, HH[h]')}`
}

function getLabels({x, y, utcOffset}) {
    return `${y} km/h\n${format(setUTCOffset(x, utcOffset), 'dddd, MMMM D, HH[h]')}`
}

function computeDomain(data) {
    const max = Math.max(
        ...data.map(m => {
            const mm = Math.max(m.windSpeedAvg, m.windSpeedGust)

            return isNaN(mm) ? 0 : mm
        })
    )

    return [0, Math.max(Math.ceil(max / 25) * 25, 100)]
}


export default function Wind({data, min, max, width, height}) {
    const container = <VictoryContainer
        title='Wind speed and direction'
        desc={`Wind speed in kilometre per hour (km/h) and direction in degree (°) every hour from ${min} to ${max}.`}
    />
    const withCompass = width > 475

    const showAvg  = shouldShowGraph(data, 'windSpeedAvg')
    const showGust = shouldShowGraph(data, 'windSpeedGust')

    if(!(showAvg || showGust)) {
        return null
    }

    const avgData  = filterDataset(data, 'windSpeedAvg')
    const gustData = filterDataset(data, 'windSpeedGust')
    const domain = computeDomain(data)

    return (<div>
        <h2>Wind speed and direction</h2>
        <VictoryChart width={width} height={height} theme={theme} containerComponent={container} domainPadding={{x: 25}}>
            <VictoryAxis scale='time' tickFormat={formatHours} />
            <VictoryAxis dependentAxis scale='linear' domain={domain} tickValues={range(domain[0], ++domain[1], 25)} label='Speed (km/h)' style={STYLE.axis} />
            {showAvg  && <VictoryLine data={avgData} x='measurementDateTime' y='windSpeedAvg' style={STYLE.avg.line} label='Average' labelComponent={<VictoryLabel dx={withCompass ? 5 : undefined} />} />}
            {showAvg  && <VictoryScatter data={avgData} x='measurementDateTime' y='windSpeedAvg' style={STYLE.avg.scatter} labels={getSpeedAndDirectionLabels} events={scatterEvents} dataComponent={<Point size={withCompass ? 10 : undefined} />} labelComponent={<VictoryTooltip />} />}
            {showAvg  && withCompass &&
                <VictoryScatter data={avgData} x='measurementDateTime' y='windSpeedAvg' dataComponent={ARROW} />
            }
            {showGust && <VictoryLine data={gustData} x='measurementDateTime' y='windSpeedGust' style={STYLE.gust.line} label='Gust' />}
            {showGust && <VictoryScatter data={gustData} x='measurementDateTime' y='windSpeedGust' labels={getLabels} labelComponent={<VictoryTooltip />} events={scatterEvents} style={STYLE.gust.scatter} />}
        </VictoryChart>
    </div>)
}
