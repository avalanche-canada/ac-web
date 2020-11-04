import React from 'react'
import { useForecast, useReport } from '../Context'
import { domain } from 'assets/config.json'
import { InnerHTML } from 'components/misc'
import NoRatingModes, {
    useText,
    EARLY_SEASON,
    SPRING_SITUATION,
    OFF_SEASON,
} from 'constants/forecast/mode'
import styles from './Danger.css'

export default function Condition() {
    const forecast = useForecast()
    const report = useReport()
    const text = useText(forecast?.type)

    if (!NoRatingModes.has(forecast?.type)) {
        return null
    }

    const { type } = forecast
    const { message, comment } = report

    return (
        <div className={styles.Condition}>
            <h2 className={styles.ConditionHeader}>{text}</h2>
            <img
                className={styles.ConditionIcon}
                title={text}
                alt={text}
                src={ICON_URLS.get(type)}
            />
            <div className={styles.ConditionContent}>
                <InnerHTML>{message}</InnerHTML>
            </div>
            <InnerHTML>{comment}</InnerHTML>
        </div>
    )
}

// Constants
const IMAGES = domain + 'images/'
const ICON_URLS = new Map([
    [EARLY_SEASON, IMAGES + 'early_season_icon.svg'],
    [SPRING_SITUATION, IMAGES + 'spring_situation_icon.svg'],
    [OFF_SEASON, IMAGES + 'summer_conditions_icon.svg'],
])
