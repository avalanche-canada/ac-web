import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, useIntl } from 'react-intl'
import { useReport } from './Context'
import Comment from 'layouts/products/min/Comment'
import List from 'layouts/products/min/List'
import { Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import Panel from 'components/panel'
import Shim from 'components/Shim'
import { RED, ORANGE } from 'constants/forecast/palette'
import styles from './HotZoneReport.css'
import { CM } from 'constants/intl'

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
                {value || <FormattedMessage defaultMessage="Unknown" />}
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
    const intl = useIntl()
    const header = (
        <FormattedMessage
            description="Layout products/hzr/CriticalFactors"
            defaultMessage="Critical Factors Summary"
        />
    )

    return (
        <Panel header={header} expanded>
            <Shim horizontal>
                <p>
                    <strong>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Critical factors influence avalanche hazard. The more critical factors, the greater the potential for avalanches."
                        />
                    </strong>
                </p>
                <List>
                    <CriticalFactor value={criticalFactorsInstability}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Signs of instability"
                        />
                    </CriticalFactor>
                    <CriticalFactor
                        value={criticalFactorsPersistentAvalancheProblem}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Persistent avalanche problem"
                        />
                    </CriticalFactor>
                    <CriticalFactor value={criticalFactorsRecentRainfall}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Recent rainfall"
                        />
                    </CriticalFactor>
                    <CriticalFactor value={criticalFactorsRecentSnowfall}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Recent snowfall > {height}"
                            values={{
                                height: intl.formatNumber(30, CM),
                            }}
                        />
                    </CriticalFactor>
                    <CriticalFactor value={criticalFactorsRecentWindLoading}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Recent wind loading"
                        />
                    </CriticalFactor>
                    <CriticalFactor value={criticalFactorsSignificantWarming}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Significant warming"
                        />
                    </CriticalFactor>
                    <CriticalFactor value={criticalFactorsSlabAvalanches}>
                        <FormattedMessage
                            description="Layout products/hzr/CriticalFactors"
                            defaultMessage="Slab avalanches in the last 48 hours"
                        />
                    </CriticalFactor>
                </List>
                {criticalFactorsQuestions && (
                    <Comment
                        title={
                            <FormattedMessage
                                description="Layout products/hzr/CriticalFactors"
                                defaultMessage="Information to collect while travelling"
                            />
                        }>
                        <StructuredText value={criticalFactorsQuestions} />
                    </Comment>
                )}
                {criticalFactorsComments && (
                    <Comment>
                        <StructuredText value={criticalFactorsComments} />
                    </Comment>
                )}
            </Shim>
        </Panel>
    )
}

export default function CriticalFactors() {
    const report = useReport()

    return report ? <CriticalFactorsComponent {...report.data} /> : null
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
