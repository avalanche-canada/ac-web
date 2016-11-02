import React, {PropTypes} from 'react'
import {List} from 'immutable'
import moment from 'moment'
import {onlyUpdateForKey} from 'compose'
import {VictoryBar, VictoryLine, VictoryChart, VictoryScatter, VictoryGroup, VictoryAxis, VictoryStack, VictoryTheme} from 'victory'

const theme = VictoryTheme.material

function formatHours(date) {
    if (date.getHours() === 0) {
        return moment(date).format('YYYY-MM-DD')
    }

    return moment(date).format('HH[h]')
}
function formatForUnit(unit) {
    return value => `${value} ${unit}`
}

Chart.propTypes = {
    measurements: PropTypes.instanceOf(List).isRequired,
}

function Chart({measurements}) {
    const data = measurements.toArray()

    return (
        <div>
            <h2>Air Temperature</h2>
            <VictoryChart width={800} height={400} theme={theme} domainPadding={20} title='Air Temperature'>
                <VictoryAxis scale='time' tickFormat={formatHours} />
                <VictoryAxis dependentAxis tickFormat={formatForUnit('°C')} />
                <VictoryScatter data={data} x='measurementDateTime' y='airTempAvg' />
                <VictoryScatter data={data} x='measurementDateTime' y='airTempMin' />
                <VictoryScatter data={data} x='measurementDateTime' y='airTempMax' />
                <VictoryLine data={data} x='measurementDateTime' y='airTempAvg' label='Average' />
                <VictoryLine data={data} x='measurementDateTime' y='airTempMin' label='Minimum' />
                <VictoryLine data={data} x='measurementDateTime' y='airTempMax' label='Maximum' />
            </VictoryChart>
            <h2>Wind speed and direction</h2>
            <VictoryChart width={800} height={400} theme={theme} domainPadding={20} title='Wind speed and direction'>
                <VictoryAxis scale='time' tickFormat={formatHours} />
                <VictoryAxis dependentAxis tickFormat={formatForUnit('km/h')} />
                <VictoryScatter data={data} x='measurementDateTime' y='windSpeedGust' />
                <VictoryLine data={data} x='measurementDateTime' y='windSpeedGust' label='Gust' />
                <VictoryBar data={data} x='measurementDateTime' y='windSpeedAvg' label='Average' />
            </VictoryChart>
        </div>
    )
}

export default onlyUpdateForKey('measurements')(Chart)
