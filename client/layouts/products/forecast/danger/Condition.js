import React from 'react'
import PropTypes from 'prop-types'
import Modes, {
    useText,
    EARLY_SEASON,
    SPRING_SITUATION,
    OFF_SEASON,
} from 'constants/forecast/mode'
import { Generic } from 'prismic/layouts'
import { domain } from 'assets/config.json'
import styles from './Danger.css'

Condition.propTypes = {
    mode: PropTypes.oneOf(Array.from(Modes)).isRequired,
    message: PropTypes.element,
    children: PropTypes.element,
}

export default function Condition({ mode, message, children }) {
    const text = useText(mode)

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
    [SPRING_SITUATION, IMAGES + 'spring_situation_icon.svg'],
    [OFF_SEASON, IMAGES + 'summer_conditions_icon.svg'],
])
const PRISMIC_UIDS = new Map([
    [EARLY_SEASON, 'forecast-early-season-message'],
    [SPRING_SITUATION, 'forecast-spring-conditions-message'],
    [OFF_SEASON, 'forecast-off-season-message'],
])
