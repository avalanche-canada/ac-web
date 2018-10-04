import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import loadChartSet from 'bundle-loader?lazy!./ChartSet'
import Bundle from 'components/Bundle'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Loading, Muted } from 'components/text'
import * as Columns from './columns'
import * as Headers from './headers'

function ChartSet(props) {
    return (
        <Bundle load={loadChartSet}>
            {module => (module ? <module.default {...props} /> : <Loading />)}
        </Bundle>
    )
}

export default class Station extends Component {
    static propTypes = {
        measurements: PropTypes.arrayOf(PropTypes.object),
        utcOffset: PropTypes.number.isRequired,
    }
    get computedMeasurements() {
        const { measurements, utcOffset } = this.props

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
    render() {
        if (this.props.measurements.length === 0) {
            return <Muted>This station currently has no data avaliable</Muted>
        }

        const measurements = this.computedMeasurements

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
                        <ChartSet measurements={measurements} />
                    </Panel>
                </PanelSet>
            </Tabs>
        )
    }
}

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
