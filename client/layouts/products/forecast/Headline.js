import React from 'react'
import { useForecast } from './Context'
import { InnerHTML } from 'components/misc'
import styles from './Forecast.module.css'

export default function Headline() {
    const forecast = useForecast()

    return forecast ? (
        <header className={styles.Headline}>
            <InnerHTML>{forecast.highlights}</InnerHTML>
        </header>
    ) : null
}
