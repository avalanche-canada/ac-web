import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import loadChartSet from 'bundle-loader?lazy!./ChartSet'
import Bundle from 'components/Bundle'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Loading, Muted } from 'components/text'
import styles from './Station.css'
import * as Columns from './columns'
import * as Headers from './headers'

function ChartSet(props) {
    return (
        <Bundle load={loadChartSet}>
            {Component => (Component ? <Component {...props} /> : <Loading />)}
        </Bundle>
    )
}

export default class Station extends Component {
    static render(station) {
        if (!station) {
            return null
        }

        return <Station measurements={computeMeasurements(station)} />
    }
    static propTypes = {
        measurements: PropTypes.arrayOf(PropTypes.object),
    }
    shouldComponentUpdate({ measurements }) {
        return measurements !== this.props.measurements
    }
    render() {
        const { measurements } = this.props

        //TODO(karl): Ensure we always get an empty measurements object
        if (typeof measurements !== 'undefined' && measurements.size === 0) {
            return (
                <div className={styles.UnavaliableMessage}>
                    <Muted>This station currently has no data avaliable</Muted>
                </div>
            )
        }

        return (
            <Tabs theme="LOOSE">
                <HeaderSet>
                    <Header>Table</Header>
                    <Header>Charts</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel title="Table">
                        {measurements ? (
                            <Table
                                measurements={measurements}
                                columns={COLUMNS}
                                headers={HEADERS}
                            />
                        ) : (
                            <Loading />
                        )}
                    </Panel>
                    <Panel title="Charts">
                        {measurements ? (
                            <ChartSet measurements={measurements} />
                        ) : (
                            <Loading />
                        )}
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

// utils
function computeMeasurements(station) {
    if (!station.has('measurements')) {
        return
    }

    const utcOffset = station.get('utcOffset')

    return station
        .get('measurements')
        .map(m =>
            m.merge({
                measurementDateTime: new Date(m.get('measurementDateTime')),
                utcOffset,
            })
        )
        .sortBy(m => m.get('measurementDateTime'))
        .map((m, i, all) => {
            const newSnow =
                m.get('snowHeight') - all.getIn([i - 1, 'snowHeight'], NaN)

            return m.set('newSnow', newSnow < 0.5 ? 0 : Math.round(newSnow))
        })
        .map(m => m.toObject())
        .reverse()
}
