import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import Comment from 'layouts/products/min/Comment'
import List from 'layouts/products/min/List'
import { Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import Panel from './Panel'
import { RED, ORANGE } from 'constants/forecast/palette'
import styles from './HotZoneReport.css'

CriticalFactor.propTypes = {
    value: PropTypes.oneOf(['Yes', 'No']),
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

CriticalFactorsComponent.propTypes = {
    criticalFactorsPersistentAvalancheProblem: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsSlabAvalanches: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsInstability: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsRecentSnowfall: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsRecentRainfall: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsRecentWindLoading: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsSignificantWarming: PropTypes.oneOf(['Yes', 'No']),
    criticalFactorsQuestions: PropTypes.string,
    criticalFactorsComments: PropTypes.string,
}

function CriticalFactorsComponent({
    criticalFactorsPersistentAvalancheProblem,
    criticalFactorsSlabAvalanches,
    criticalFactorsInstability,
    criticalFactorsRecentSnowfall,
    criticalFactorsRecentRainfall,
    criticalFactorsRecentWindLoading,
    criticalFactorsSignificantWarming,
    criticalFactorsQuestions,
    criticalFactorsComments,
}) {
    return (
        <Panel header="Critical Factors Summary" expanded>
            <p>
                <strong>
                    Critical factors influence avalanche hazard. The more
                    critical factors, the greater the potential for avalanches.
                </strong>
            </p>
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
            {criticalFactorsQuestions && (
                <Comment title="Information to collect while traveling">
                    <StructuredText value={criticalFactorsQuestions} />
                </Comment>
            )}
            {criticalFactorsComments && (
                <Comment>
                    <StructuredText value={criticalFactorsComments} />
                </Comment>
            )}
        </Panel>
    )
}

export default function CriticalFactors() {
    return (
        <Consumer>
            {report =>
                report ? <CriticalFactorsComponent {...report.data} /> : null
            }
        </Consumer>
    )
}

// Constants
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
