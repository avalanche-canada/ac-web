import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useForecast } from 'hooks/async/forecast'
import { Muted, Warning } from 'components/text'
import Shim from 'components/Shim'
import * as components from 'layouts/products/forecast'
import { Disclaimer, DangerRatings } from 'layouts/products/forecast/Footer'
import externals from 'router/externals'
import styles from './TripPlanner.css'

Content.propTypes = {
    id: PropTypes.string.isRequired,
}

export default function Forecast({ id }) {
    if (externals.has(id)) {
        return (
            <p className={styles.PanelContent}>
                <FormattedMessage
                    description="Layout TripPlanner/Forecast"
                    defaultMessage="Avalanche forecast is available at: <link />"
                    values={{
                        link() {
                            const url = externals.get(id)

                            return (
                                <a href={url} target={id}>
                                    {url.replace('//', '')}
                                </a>
                            )
                        },
                    }}
                />
            </p>
        )
    }

    return <Content name={id} />
}

// Utils
Content.propTypes = {
    name: PropTypes.string.isRequired,
}

function Content({ name }) {
    const [forecast, pending] = useForecast(name)

    if (pending) {
        return (
            <Shim horizontal>
                <Muted>
                    <FormattedMessage
                        description="Layout TripPlanner/Forecast"
                        defaultMessage="Loading avalanche forecast..."
                    />
                </Muted>
            </Shim>
        )
    }

    return (
        <Fragment>
            {forecast ? (
                <components.Provider value={forecast}>
                    <Shim horizontal>
                        <components.Metadata />
                        <components.Headline />
                    </Shim>
                    <components.TabSet />
                </components.Provider>
            ) : (
                <Warning>
                    <FormattedMessage
                        description="Layout TripPlanner/Forecast"
                        defaultMessage="No avalanche forecast has been found for {name}."
                        values={{ name }}
                    />
                </Warning>
            )}
            <Disclaimer />
            <DangerRatings />
        </Fragment>
    )
}
