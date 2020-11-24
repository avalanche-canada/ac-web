import React from 'react'
import { useReport, useForecast } from './Context'
import { InnerHTML } from 'components/misc'
import * as urls from 'utils/url'
import config from 'assets/config.json'
import { FALL, SPRING, SUMMER } from 'constants/offseason/seasons'
import { OFFSEASON } from 'constants/products'
import styles from './OffSeason.module.css'

export default function OffSeason() {
    const { type } = useForecast()
    const { season, message, comment } = useReport()

    if (type !== OFFSEASON) {
        return null
    }

    const { value, display } = season
    const src = urls.path(config.domain, 'images', IconFilenames.get(value))

    return (
        <div className={styles.Condition}>
            <h2 className={styles.ConditionHeader}>{display}</h2>
            <img className={styles.ConditionIcon} title={display} alt={display} src={src} />
            <div className={styles.ConditionContent}>
                <InnerHTML>{message}</InnerHTML>
            </div>
            <InnerHTML>{comment}</InnerHTML>
        </div>
    )
}

// Constants
const IconFilenames = new Map([
    [FALL, 'early_season_icon.svg'],
    [SPRING, 'spring_situation_icon.svg'],
    [SUMMER, 'summer_conditions_icon.svg'],
])
