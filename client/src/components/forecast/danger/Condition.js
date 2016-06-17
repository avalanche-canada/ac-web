import React, { PropTypes } from 'react'
import {branch, renderComponent, renderNothing} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'
import {VALUES, TITLES, MESSAGES} from 'constants/forecast/mode'
import {asMap, asValues} from 'constants/utils'
import {Day} from 'components/misc'
import MarkdownRenderer from 'react-markdown-renderer'

const {SPRING, SUMMER, OFF} = VALUES
const HANDLED = new Set([SUMMER, SPRING])

const HEADERS = asMap(VALUES, TITLES)
const MARKDOWNS = asMap(VALUES, MESSAGES)
const ICONS = new Map([
    [SPRING, 'http://www.avalanche.ca/assets/images/spring_situation_icon.svg'],
    [SUMMER, 'http://www.avalanche.ca/assets/images/summer_conditions_icon.svg'],
])

Condition.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    mode: PropTypes.oneOf(asValues(VALUES)).isRequired,
}

const OPTIONS = {
    linkify: true,
    linkTarget: '_blank',
}

function Condition({ mode, date }) {
    return (
        <div styleName='Condition'>
            <h2 styleName='ConditionHeader'>
                {HEADERS.get(mode)}: <Day value={date} />
            </h2>
            <img styleName='ConditionIcon' src={ICONS.get(mode)} />
            <MarkdownRenderer markdown={MARKDOWNS.get(mode)} options={OPTIONS} styleName='ConditionContent' />
        </div>
    )
}

Condition = CSSModules(Condition, styles)

export default branch(
    ({mode = OFF}) => HANDLED.has(mode),
    renderComponent(Condition),
    renderNothing()
)(Condition)
