import React from 'react'
import PropTypes from 'prop-types'
import { useForecast } from 'hooks/async/api/products'
import { FormattedMessage } from 'react-intl'
import * as Async from 'contexts/async'
import { Muted, Warning } from 'components/text'
import Shim from 'components/Shim'
import * as components from 'layouts/products/forecast'
import { Disclaimer, DangerRatings } from 'layouts/products/forecast/Footer'
import styles from './TripPlanner.module.css'

Forecast.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function Forecast({ id }) {
    return (
        <Async.Provider value={useForecast(id)}>
            <Async.Pending>
                <Shim horizontal>
                    <Muted>
                        <FormattedMessage
                            description="Layout TripPlanner/Forecast"
                            defaultMessage="Loading avalanche forecast..."
                        />
                    </Muted>
                </Shim>
            </Async.Pending>
            <Async.Found>
                <ForecastContent />
            </Async.Found>
            <Async.NotFound>
                <Warning>
                    <FormattedMessage
                        description="Layout TripPlanner/Forecast"
                        defaultMessage="No avalanche forecast has been found for {name}."
                        values={{ name }}
                    />
                </Warning>
            </Async.NotFound>
        </Async.Provider>
    )
}

function ForecastContent({ payload }) {
    if (payload.owner.isExternal) {
        return (
            <p className={styles.PanelContent}>
                <FormattedMessage
                    description="Layout TripPlanner/Forecast"
                    defaultMessage="Avalanche forecast is available at: <link></link>"
                    values={{
                        link() {
                            const { url, slug } = payload

                            return (
                                <a href={url} target={slug}>
                                    {payload.report.title}
                                </a>
                            )
                        },
                    }}
                />
            </p>
        )
    }

    return (
        <components.Provider value={payload}>
            <Shim horizontal>
                <components.Metadata />
                <components.Headline />
            </Shim>
            <components.TabSet />
            <Disclaimer />
            <DangerRatings />
        </components.Provider>
    )
}
