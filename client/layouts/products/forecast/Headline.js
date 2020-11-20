import React from 'react'
import { useReport } from './Context'
import { InnerHTML } from 'components/misc'
import styles from './Forecast.css'

export default function Headline() {
    const report = useReport()

    return (
        <header className={styles.Headline}>
            <InnerHTML>{report.highlights}</InnerHTML>
        </header>
    )
}
