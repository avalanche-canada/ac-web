import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'
import {VALUES, TITLES, MESSAGES} from 'constants/forecast/mode'
import {asMap, asValues} from 'constants/utils'
import MarkdownRenderer from 'react-markdown-renderer'

const {SPRING, SUMMER, OFF} = VALUES
const HANDLED = new Set([SUMMER, SPRING, OFF])

const HEADERS = asMap(VALUES, TITLES)
const MARKDOWNS = asMap(VALUES, MESSAGES)
const ICONS = new Map([
    [SPRING, 'http://www.avalanche.ca/assets/images/spring_situation_icon.svg'],
    [SUMMER, 'http://www.avalanche.ca/assets/images/summer_conditions_icon.svg'],
    [OFF, 'http://www.avalanche.ca/assets/images/summer_conditions_icon.svg'],
])

Condition.propTypes = {
    mode: PropTypes.oneOf([...HANDLED]).isRequired,
}

const OPTIONS = {
    linkify: true,
    linkTarget: '_blank',
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
            <MarkdownRenderer markdown={MARKDOWNS.get(mode)} options={OPTIONS} styleName='ConditionContent' />
        </div>
    )
}

export default CSSModules(Condition, styles)
