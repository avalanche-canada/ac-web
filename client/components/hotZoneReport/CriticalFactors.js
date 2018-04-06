import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Comment from 'components/mountainInformationNetwork/Comment'
import List from 'components/mountainInformationNetwork/List'
import { Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import Panel from './Panel'
import { RED, ORANGE } from 'constants/forecast/palette'
import styles from './HotZoneReport.css'

const STYLES = new Map([
    [
        'Yes',
        {
            fontWeight: 700,
            color: RED,
        },
    ],
    [
        'No',
        {
            fontWeight: 700,
            color: '#595959',
        },
    ],
    [
        undefined,
        {
            fontWeight: 700,
            color: ORANGE,
        },
    ],
])

const truthPropType = PropTypes.oneOf(['Yes', 'No'])

CriticalFactor.propTypes = {
    value: truthPropType,
    children: PropTypes.node.isRequired,
}

function CriticalFactor({ children, value }) {
    const style = STYLES.get(value)

    return (
        <Fragment>
            <Term className={styles['CriticalFactors--Term']} style={style}>
                {children}
            </Term>
            <Definition
                className={styles['CriticalFactors--Definition']}
                style={style}>
                {value || 'Unknown'}
            </Definition>
        </Fragment>
    )
}

export default class CriticalFactors extends PureComponent {
    static propTypes = {
        criticalFactorsPersistentAvalancheProblem: truthPropType,
        criticalFactorsSlabAvalanches: truthPropType,
        criticalFactorsInstability: truthPropType,
        criticalFactorsRecentSnowfall: truthPropType,
        criticalFactorsRecentRainfall: truthPropType,
        criticalFactorsRecentWindLoading: truthPropType,
        criticalFactorsSignificantWarming: truthPropType,
        criticalFactorsQuestions: PropTypes.string,
        criticalFactorsComments: PropTypes.string,
    }
    get questions() {
        const { criticalFactorsQuestions } = this.props

        if (!criticalFactorsQuestions) {
            return null
        }

        return (
            <Comment title="Information to collect while traveling">
                <StructuredText value={criticalFactorsQuestions} />
            </Comment>
        )
    }
    get comments() {
        const { criticalFactorsComments } = this.props

        if (!criticalFactorsComments) {
            return null
        }

        return (
            <Comment>
                <StructuredText value={criticalFactorsComments} />
            </Comment>
        )
    }
    get factors() {
        const {
            criticalFactorsPersistentAvalancheProblem,
            criticalFactorsSlabAvalanches,
            criticalFactorsInstability,
            criticalFactorsRecentSnowfall,
            criticalFactorsRecentRainfall,
            criticalFactorsRecentWindLoading,
            criticalFactorsSignificantWarming,
        } = this.props

        return (
            <List>
                <CriticalFactor value={criticalFactorsInstability}>
                    Signs of instability
                </CriticalFactor>
                <CriticalFactor
                    value={criticalFactorsPersistentAvalancheProblem}>
                    Persistent avalanche problem
                </CriticalFactor>
                <CriticalFactor value={criticalFactorsRecentRainfall}>
                    Recent rainfall
                </CriticalFactor>
                <CriticalFactor value={criticalFactorsRecentSnowfall}>
                    Recent snowfall > 30cm
                </CriticalFactor>
                <CriticalFactor value={criticalFactorsRecentWindLoading}>
                    Recent wind loading
                </CriticalFactor>
                <CriticalFactor value={criticalFactorsSignificantWarming}>
                    Significant warming
                </CriticalFactor>
                <CriticalFactor value={criticalFactorsSlabAvalanches}>
                    Slab avalanches in the last 48 hours
                </CriticalFactor>
            </List>
        )
    }
    render() {
        return (
            <Panel header="Critical Factors Summary" expanded>
                <p>
                    <strong>
                        Critical factors influence avalanche hazard. The more
                        critical factors, the greater the potential for
                        avalanches.
                    </strong>
                </p>
                {this.factors}
                {this.questions}
                {this.comments}
            </Panel>
        )
    }
}
