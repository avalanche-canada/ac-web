import React from 'react'
import PropTypes from 'prop-types'
import Section from 'layouts/products/min/Section'
import { List, Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import styles from './HotZoneReport.css'

const TerrainFeatureTitles = new Map([
    ['CrossloadedSlopes', 'Crossloaded slopes'],
    ['ShallowSnowpack', 'Shallow snowpack'],
    ['VariableDepthSnowpack', 'Variable depth snowpack'],
    ['Convex', 'Convex'],
    ['Unsupported', 'Unsupported'],
    ['LeeSlopes', 'Lee slopes'],
    ['Creeks', 'Creeks'],
    ['RunoutZones', 'Runout Zone'],
    ['Cutblocks', 'Cutblocks'],
])
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

function AvoidItem({ children, value }) {
    const className = value === 'Yes' ? 'Avoid' : 'Okay'

    return <li className={styles[className]}>{children}</li>
}

const ASPECTS = ['E', 'W', 'Se', 'Sw', 'S', 'Nw', 'N', 'Ne']
function Aspects({ prefix, report }) {
    return (
        <AvoidList>
            {ASPECTS.map(aspect => (
                <AvoidItem value={report[prefix + aspect]}>
                    {aspect.toUpperCase()}
                </AvoidItem>
            ))}
        </AvoidList>
    )
}

function TerrainFeatures({ prefix, report }) {
    const keys = TerrainFeatureKeys.get(prefix)

    return (
        <AvoidList>
            {keys.map(key => (
                <AvoidItem key={key} value={report[prefix + key]}>
                    {TerrainFeatureTitles.get(key)}
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
                <Term>Aspect</Term>
                <Definition>
                    <Aspects prefix={prefix} report={report} />
                </Definition>
                <Term>Terrain features</Term>
                <Definition>
                    <TerrainFeatures prefix={prefix} report={report} />
                </Definition>
                <Term block>Travel advice</Term>
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
