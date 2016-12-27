import React, {PropTypes, Children, cloneElement} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'
import Day from './Day'
import {VALUES} from 'constants/forecast/mode'

const {SPRING, SUMMER, OFF, EARLY_SEASON} = VALUES
const UNHANDLED = new Set([SUMMER, SPRING, OFF, EARLY_SEASON])

Table.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Day)).isRequired,
    mode: PropTypes.string.isRequired,
    confidence: PropTypes.shape({
        level: PropTypes.string,
        comment: PropTypes.string,
    }),
}

function Table({confidence: {level, comment}, children, mode}) {
    if (UNHANDLED.has(mode)) {
        return null
    }

    return (
        <table styleName='Table'>
            <caption styleName='Caption'>
                <dl>
                    <dt>Confidence</dt>
                    <dd>
                        <strong>{level}</strong> {comment}
                    </dd>
                </dl>
            </caption>
            {Children.map(children, (day, index) => cloneElement(day, {index}))}
        </table>
    )
}

export default CSSModules(Table, styles)
