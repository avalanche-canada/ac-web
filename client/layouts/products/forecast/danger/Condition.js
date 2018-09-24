import React from 'react'
import PropTypes from 'prop-types'
import {
    SPRING,
    SUMMER,
    OFF,
    EARLY_SEASON,
    Texts,
} from 'constants/forecast/mode'
import { Generic } from 'prismic/components'
import { domain } from 'assets/config.json'
import styles from './Danger.css'

//TODO(wnh): Remove either SUMMER or OFF because they are the same
const HANDLED = new Set([SUMMER, SPRING, OFF, EARLY_SEASON])

Condition.propTypes = {
    mode: PropTypes.oneOf(Array.from(HANDLED)).isRequired,
}

export default function Condition({ mode }) {
    const text = Texts.get(mode)

    if (!HANDLED.has(mode)) {
        return null
    }

    return (
        <div className={styles.Condition}>
            <h2 className={styles.ConditionHeader}>{text}</h2>
            <img
                className={styles.ConditionIcon}
                title={text}
                alt={text}
                src={ICONS.get(mode)}
            />
            <div className={styles.ConditionContent}>
                <Generic uid={UIDS.get(mode)} />
            </div>
        </div>
    )
}

const ICONS = new Map([
    [EARLY_SEASON, `${domain}images/early_season_icon.svg`],
    [SPRING, `${domain}images/spring_situation_icon.svg`],
    [SUMMER, `${domain}images/summer_conditions_icon.svg`],
    [OFF, `${domain}images/summer_conditions_icon.svg`],
])
const UIDS = new Map([
    [EARLY_SEASON, 'forecast-early-season-message'],
    [SPRING, 'forecast-spring-conditions-message'],
    [SUMMER, 'forecast-summer-conditions-message'],
    [OFF, 'forecast-off-season-message'],
])
