import React from 'react'
import PropTypes from 'prop-types'
import { useAspects, useIntlMemo } from 'hooks/intl'
import { FormattedMessage } from 'react-intl'
import Section from 'layouts/products/min/Section'
import { List, Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import styles from './Advisory.css'

function AvoidItem({ children, value }) {
    const className = value === 'Yes' ? 'Avoid' : 'Okay'

    return <li className={styles[className]}>{children}</li>
}

const ASPECTS = ['N', 'Ne', 'E', 'Se', 'S', 'Sw', 'W', 'Nw']
function Aspects({ prefix, report }) {
    const aspects = useAspects()

    return (
        <AvoidList>
            {ASPECTS.map((aspect, index) => (
                <AvoidItem value={report[prefix + aspect]}>
                    {aspects.get(index)}
                </AvoidItem>
            ))}
        </AvoidList>
    )
}

function TerrainFeatures({ prefix, report }) {
    const titles = useTerrainFeatureTitles()
    const keys = TerrainFeatureKeys.get(prefix)

    return (
        <AvoidList>
            {keys.map(key => (
                <AvoidItem key={key} value={report[prefix + key]}>
                    {titles.get(key)}
                </AvoidItem>
            ))}
        </AvoidList>
    )
}

TerrainSummary.propTypes = {
    prefix: PropTypes.oneOf(Array.from(TerrainFeatureKeys.keys())).isRequired,
    title: PropTypes.string.isRequired,
    report: PropTypes.object.isRequired,
}

export default function TerrainSummary({ title, prefix, report }) {
    return (
        <Section title={title}>
            <List>
                <Term>
                    <FormattedMessage
                        description="Layout products/hzr/TerrainSummary"
                        defaultMessage="Aspect"
                    />
                </Term>
                <Definition>
                    <Aspects prefix={prefix} report={report} />
                </Definition>
                <Term>
                    <FormattedMessage
                        description="Layout products/hzr/TerrainSummary"
                        defaultMessage="Terrain features"
                    />
                </Term>
                <Definition>
                    <TerrainFeatures prefix={prefix} report={report} />
                </Definition>
                <Term block>
                    <FormattedMessage
                        description="Layout products/hzr/TerrainSummary"
                        defaultMessage="Travel advice"
                    />
                </Term>
                <Definition block className={styles.TravelAdvice}>
                    <StructuredText value={report[`${prefix}TravelAdvice`]} />
                </Definition>
            </List>
        </Section>
    )
}

AvoidList.propTypes = {
    children: PropTypes.node.isRequired,
}

function AvoidList({ children }) {
    return <ul className={styles.List}>{children}</ul>
}
function useTerrainFeatureTitles() {
    return useIntlMemo(intl => {
        const description = 'Layout products/hzr - Advisory Terrain Summary'

        return new Map([
            [
                'CrossloadedSlopes',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Cross-loaded slopes',
                }),
            ],
            [
                'ShallowSnowpack',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Shallow snowpack',
                }),
            ],
            [
                'VariableDepthSnowpack',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Variable depth snowpack',
                }),
            ],
            [
                'Convex',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Convex',
                }),
            ],
            [
                'Unsupported',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Unsupported',
                }),
            ],
            [
                'LeeSlopes',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Lee slopes',
                }),
            ],
            [
                'Creeks',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Creeks',
                }),
            ],
            [
                'RunoutZones',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Runout Zone',
                }),
            ],
            [
                'Cutblocks',
                intl.formatMessage({
                    description,
                    defaultMessage: 'Cutblocks',
                }),
            ],
        ])
    })
}
const TerrainFeatureKeys = new Map([
    [
        'treelineTerrainAvoidance',
        [
            'Unsupported',
            'LeeSlopes',
            'CrossloadedSlopes',
            'Convex',
            'ShallowSnowpack',
            'VariableDepthSnowpack',
        ],
    ],
    [
        'belowTreelineTerrainAvoidance',
        [
            'Creeks',
            'Unsupported',
            'LeeSlopes',
            'Convex',
            'Cutblocks',
            'RunoutZones',
        ],
    ],
    [
        'alpineTerrainAvoidance',
        [
            'Unsupported',
            'LeeSlopes',
            'CrossloadedSlopes',
            'Convex',
            'ShallowSnowpack',
            'VariableDepthSnowpack',
        ],
    ],
])
