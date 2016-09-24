import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'
import {VALUES, TITLES} from 'constants/forecast/mode'
import {asMap, asValues} from 'constants/utils'
import {Generic} from 'prismic/components'

const {SPRING, SUMMER, OFF} = VALUES
const HANDLED = new Set([SUMMER, SPRING, OFF])

const HEADERS = asMap(VALUES, TITLES)
const ICONS = new Map([
    [SPRING, 'http://www.avalanche.ca/assets/images/spring_situation_icon.svg'],
    [SUMMER, 'http://www.avalanche.ca/assets/images/summer_conditions_icon.svg'],
    [OFF, 'http://www.avalanche.ca/assets/images/summer_conditions_icon.svg'],
])
const UIDS = new Map([
    [SPRING, 'forecast-spring-conditions-message'],
    [SUMMER, 'forecast-summer-conditions-message'],
    [OFF, 'forecast-off-season-message'],
])

Condition.propTypes = {
    mode: PropTypes.oneOf([...HANDLED]).isRequired,
}

function Condition({mode}) {
    if (!HANDLED.has(mode)) {
        return null
    }

    return (
        <div styleName='Condition'>
            <h2 styleName='ConditionHeader'>
                {HEADERS.get(mode)}
            </h2>
            <img styleName='ConditionIcon' src={ICONS.get(mode)} />
            <div styleName='ConditionContent'>
                <Generic uid={UIDS.get(mode)} />
            </div>
        </div>
    )
}

export default CSSModules(Condition, styles)
