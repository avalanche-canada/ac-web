import React, { lazy, memo } from 'react'
import PropTypes from 'prop-types'
import Bundle from 'components/Bundle'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Muted } from 'components/text'
import Table from './Table'
import * as Columns from './columns'
import * as Headers from './headers'

const ChartSet = lazy(() => import('./ChartSet'))

Station.propTypes = {
    measurements: PropTypes.arrayOf(PropTypes.object).isRequired,
    utcOffset: PropTypes.number.isRequired,
}

function Station({ measurements, utcOffset }) {
    if (measurements.length === 0) {
        return <Muted>This station currently has no data avaliable</Muted>
    }

    measurements = computeMeasurements(measurements, utcOffset)

    return (
        <Tabs theme="LOOSE">
            <HeaderSet>
                <Header>Table</Header>
                <Header>Charts</Header>
            </HeaderSet>
            <PanelSet>
                <Panel title="Table">
                    <Table
                        measurements={measurements}
                        columns={COLUMNS}
                        headers={HEADERS}
                    />
                </Panel>
                <Panel title="Charts">
                    <Bundle>
                        <ChartSet measurements={measurements} />
                    </Bundle>
                </Panel>
            </PanelSet>
        </Tabs>
    )
}

export default memo(Station)

// Utils
function computeMeasurements(measurements, utcOffset) {
    return measurements
        .map(m => ({
            ...m,
            measurementDateTime: new Date(m.measurementDateTime),
            utcOffset,
        }))
        .sort((a, b) => a.measurementDateTime - b.measurementDateTime)
        .map((m, i, all) => {
            const newSnow = m.snowHeight - all[i - 1]?.snowHeight || NaN

            m.newSnow = newSnow < 0.5 ? 0 : Math.round(newSnow)

            return m
        })
        .reverse()
}

// Constants
const HEADERS = [
    [
        Headers.Snow,
        Headers.AirTemperature,
        Headers.Wind,
        Headers.RelativeHumidity,
    ],
    [
        Headers.SnowHeight,
        Headers.NewSnow,
        Headers.AirTemperatureAvg,
        Headers.WindSpeedAvg,
        Headers.WindDirectionAvg,
        Headers.WindSpeedGust,
    ],
]
const COLUMNS = [
    Columns.Hour,
    Columns.SnowHeight,
    Columns.NewSnow,
    Columns.AirTemperatureAvg,
    Columns.WindSpeedAvg,
    Columns.WindDirectionAvg,
    Columns.WindSpeedGust,
    Columns.RelativeHumidity,
]
