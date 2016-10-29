import React, {PropTypes} from 'react'
import {List} from 'immutable'
import {VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryStack} from 'victory'

function formatHours(date) {
    date = new Date(date)

    return `${date.getHours()}h`
}
function formatForUnit(unit) {
    return value => `${value} ${unit}`
}

Chart.propTypes = {
    measurements: PropTypes.instanceOf(List).isRequired,
}

export default function Chart({measurements}) {
    const data = measurements.toArray()

    return (
        <div>
            <h2>Air Temperature</h2>
            <VictoryChart domainPadding={20} title='Air Temperature'>
                <VictoryAxis tickFormat={formatHours} />
                <VictoryAxis dependentAxis tickFormat={formatForUnit('°C')} />
                <VictoryLine data={data} x='measurementDateTime' y='airTempAvg' label='Average' />
                <VictoryLine data={data} x='measurementDateTime' y='airTempMin' label='Min' />
                <VictoryLine data={data} x='measurementDateTime' y='airTempMax' label='Max' />
            </VictoryChart>
            <h2>Wind speed and direction</h2>
            <VictoryChart domainPadding={20} title='Wind speed and direction'>
                <VictoryAxis tickFormat={formatHours} />
                <VictoryAxis dependentAxis tickFormat={formatForUnit('km/h')} />
                <VictoryLine data={data} x='measurementDateTime' y='windSpeedGust' label='Gust' />
                <VictoryBar data={data} x='measurementDateTime' y='windSpeedAvg' label='Average' />
            </VictoryChart>
        </div>
    )
}
