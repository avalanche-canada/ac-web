import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Comment from '~/components/mountainInformationNetwork/Comment'
import List from '~/components/mountainInformationNetwork/List'
import {Term, Definition} from '~/components/description'
import Panel, {INVERSE} from '~/components/panel'
import styles from './HotZoneReport.css'
import {RED, ORANGE} from '~/constants/forecast/palette'

const TERMS = new Map([
    ['persistentAvalancheProblem', 'Persistent avalanche problem'],
    ['slabAvalanches', 'Slab avalanches in the last 48 hours'],
    ['instability', 'Signs of instability'],
    ['recentSnowfall', 'Recent snowfall > 30cm'],
    ['recentRainfall', 'Recent rainfall'],
    ['recentWindLoading', 'Recent wind loading'],
    ['significantWarming', 'Significant warming'],
])
const YES = 'Yes'
const NO = 'No'
const UNKNOWN = 'Unknown'

const VALUES = new Map([
    [true, YES],
    [false, NO],
    [null, UNKNOWN],
    [undefined, UNKNOWN],
])
const STYLES = new Map([
    [YES, {
        fontWeight: 700,
        color: RED,
    }],
    [NO, {
        fontWeight: 700,
        color: '#595959',
    }],
    [UNKNOWN, {
        fontWeight: 700,
        color: ORANGE,
    }],
])

const truthPropType = PropTypes.oneOf([true, false, null])
function createDescriptions(values) {
    return Object.keys(values).reduce((children, key) => {
        const value = VALUES.get(values[key])
        const style = STYLES.get(value)

        children.push(
            <Term key={`term-${key}`} styleName='CriticalFactors--Term' style={style}>
                {TERMS.get(key)}
            </Term>
        )

        children.push(
            <Definition key={`definition-${key}`} styleName='CriticalFactors--Definition' style={style}>
                {value}
            </Definition>
        )

        return children
    }, [])
}

CriticalFactors.propTypes = {
    report: PropTypes.shape({
        persistentAvalancheProblem: truthPropType,
        slabAvalanches: truthPropType,
        instability: truthPropType,
        recentSnowfall: truthPropType,
        recentRainfall: truthPropType,
        recentWindLoading: truthPropType,
        significantWarming: truthPropType,
        questions: PropTypes.string,
        comments: PropTypes.string,
    })
}

function CriticalFactors({report}) {
    if (!report || !report.criticalFactors) {
        return null
    }

    const {comments, questions, ...values} = report.criticalFactors

    return (
        <Panel header='Critical Factors Summary' expanded expandable theme={INVERSE}>
            <p>
                <strong>
                    Critical factors influence avalanche hazard. The more critical factors, the greater the potential for avalanches.
                </strong>
            </p>
            <List>
                {createDescriptions(values)}
            </List>
            <Comment title='Information to collect while traveling'>
                {questions}
            </Comment>
            <Comment>
                {comments}
            </Comment>
        </Panel>

    )
}

export default CSSModules(CriticalFactors, styles)
