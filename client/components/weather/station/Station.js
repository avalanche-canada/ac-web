import React, { lazy, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'
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

export default function Station({ measurements, utcOffset }) {
    const columns = useColumns()
    const headers = useHeaders()

    if (measurements.length === 0) {
        return (
            <Muted>
                <FormattedMessage
                    description="Component weather/station/Station"
                    defaultMessage="This station currently has no data available."
                />
            </Muted>
        )
    }

    measurements = computeMeasurements(measurements, utcOffset)

    return (
        <Tabs theme="LOOSE">
            <HeaderSet>
                <Header>
                    <FormattedMessage
                        description="Component weather/station/Station"
                        defaultMessage="Table"
                    />
                </Header>
                <Header>
                    <FormattedMessage
                        description="Component weather/station/Station"
                        defaultMessage="Charts"
                    />
                </Header>
            </HeaderSet>
            <PanelSet>
                <Panel>
                    <Table
                        measurements={measurements}
                        columns={columns}
                        headers={headers}
                    />
                </Panel>
                <Panel>
                    <Bundle>
                        <ChartSet measurements={measurements} />
                    </Bundle>
                </Panel>
            </PanelSet>
        </Tabs>
    )
}

// Utils
function computeMeasurements(measurements, utcOffset) {
    return measurements
        .map(m => ({
            ...m,
            measurementDateTime: new Date(m.measurementDateTime),
            utcOffset,
        }))
        .sort((a, b) => a.measurementDateTime - b.measurementDateTime)
        .reverse()
}

// Constants
function useHeaders() {
    const intl = useIntl()

    return useMemo(
        () => [
            [
                Headers.createSnow(intl),
                Headers.createAirTemperature(intl),
                Headers.createWind(intl),
                Headers.createRelativeHumidity(intl),
            ],
            [
                Headers.createSnowHeight(intl),
                Headers.createNewSnow(intl),
                Headers.createAirTemperatureAvg(intl),
                Headers.createWindSpeedAvg(intl),
                Headers.createWindDirectionAvg(intl),
                Headers.createWindSpeedGust(intl),
            ],
        ],
        [intl.locale]
    )
}
function useColumns() {
    const intl = useIntl()

    return useMemo(
        () => [
            Columns.createHour(intl),
            Columns.createSnowHeight(intl),
            Columns.createNewSnow(intl),
            Columns.createAirTemperatureAvg(intl),
            Columns.createWindSpeedAvg(intl),
            Columns.createWindDirectionAvg(intl),
            Columns.createWindSpeedGust(intl),
            Columns.createRelativeHumidity(intl),
        ],
        [intl.locale]
    )
}
