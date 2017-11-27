import React from 'react'
import PropTypes from 'prop-types'
import Section from 'components/mountainInformationNetwork/Section'
import { List, Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import styles from './HotZoneReport.css'

TerrainSummary.propTypes = {
    title: PropTypes.string.isRequired,
    aspect: PropTypes.object.isRequired,
    terrainFeatures: PropTypes.object.isRequired,
    travelAdvice: PropTypes.string,
}

const Titles = new Map([
    ['crossloadedSlopes', 'Crossloaded slopes'],
    ['shallowSnowpack', 'Shallow snowpack'],
    ['variableDepthSnowpack', 'Variable depth snowpack'],
    ['convex', 'Convex'],
    ['unsupported', 'Unsupported'],
    ['leeSlopes', 'Lee slopes'],
    ['creeks', 'Creeks'],
    ['runoutZones', 'Runout Zone'],
    ['cutblocks', 'Cutblocks'],
])

AvoidList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function AvoidList({ items }) {
    return (
        <ul className={styles.List}>
            {Object.keys(items).map(name => {
                const className = items[name] ? 'Avoid' : 'Okay'

                return (
                    <li key={name} className={styles[className]}>
                        {Titles.get(name) || name}
                    </li>
                )
            })}
        </ul>
    )
}

export default function TerrainSummary({
    title,
    aspect,
    terrainFeatures,
    travelAdvice,
}) {
    return (
        <Section title={title}>
            <List>
                <Term>Aspect</Term>
                <Definition>
                    <AvoidList items={aspect} />
                </Definition>
                <Term>Terrain features</Term>
                <Definition>
                    <AvoidList items={terrainFeatures} />
                </Definition>
                <Term block>Travel advice</Term>
                <Definition block className={styles.TravelAdvice}>
                    <StructuredText value={travelAdvice} />
                </Definition>
            </List>
        </Section>
    )
}
