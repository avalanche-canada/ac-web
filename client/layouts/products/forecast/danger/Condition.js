import React from 'react'
import PropTypes from 'prop-types'
import {
    Texts,
    EARLY_SEASON,
    SPRING,
    SUMMER,
    OFF,
} from 'constants/forecast/mode'
import { Generic } from 'prismic/layouts'
import { domain } from 'assets/config.json'
import styles from './Danger.css'

Condition.propTypes = {
    mode: PropTypes.oneOf([EARLY_SEASON, SPRING, SUMMER, OFF]).isRequired,
    message: PropTypes.element,
    children: PropTypes.element,
}

export default function Condition({ mode, message, children }) {
    const text = Texts.get(mode)

    return (
        <div className={styles.Condition}>
            <h2 className={styles.ConditionHeader}>{text}</h2>
            <img
                className={styles.ConditionIcon}
                title={text}
                alt={text}
                src={ICON_URLS.get(mode)}
            />
            <div className={styles.ConditionContent}>
                {message || <Generic uid={PRISMIC_UIDS.get(mode)} />}
            </div>
            {children}
        </div>
    )
}

// Constants
const IMAGES = domain + 'images/'
const ICON_URLS = new Map([
    [EARLY_SEASON, IMAGES + 'early_season_icon.svg'],
    [SPRING, IMAGES + 'spring_situation_icon.svg'],
    [SUMMER, IMAGES + 'summer_conditions_icon.svg'],
    [OFF, IMAGES + 'summer_conditions_icon.svg'],
])
const PRISMIC_UIDS = new Map([
    [EARLY_SEASON, 'forecast-early-season-message'],
    [SPRING, 'forecast-spring-conditions-message'],
    [SUMMER, 'forecast-summer-conditions-message'],
    [OFF, 'forecast-off-season-message'],
])
