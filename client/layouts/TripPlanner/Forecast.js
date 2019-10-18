import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useForecast } from 'hooks/async/forecast'
import { Muted } from 'components/text'
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
                Avalanche forecast are available at:{' '}
                <a href={externals.get(id)} target={id}>
                    {externals.get(id).replace('//', '')}
                </a>
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
                <Muted>Loading avalanche forecast...</Muted>
            </Shim>
        )
    }

    return (
        <Fragment>
            {forecast && (
                <components.Provider value={forecast}>
                    <Shim horizontal>
                        <components.Metadata />
                        <components.Headline />
                    </Shim>
                    <components.TabSet />
                </components.Provider>
            )}
            <Disclaimer />
            <DangerRatings />
        </Fragment>
    )
}
