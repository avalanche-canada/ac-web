import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Section from '~/components/mountainInformationNetwork/Section'
import { List, Term, Definition } from '~/components/description'
import { InnerHTML } from '~/components/misc'
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
        <ul styleName="List">
            {Object.keys(items).map(name => (
                <li key={name} styleName={items[name] ? 'Avoid' : 'Okay'}>
                    {Titles.get(name) || name}
                </li>
            ))}
        </ul>
    )
}

const StyledAvoidList = CSSModules(AvoidList, styles)

function TerrainSummary({ title, aspect, terrainFeatures, travelAdvice }) {
    return (
        <Section title={title}>
            <List>
                <Term>Aspect</Term>
                <Definition>
                    <StyledAvoidList items={aspect} />
                </Definition>
                <Term>Terrain features</Term>
                <Definition>
                    <StyledAvoidList items={terrainFeatures} />
                </Definition>
                <Term block>Travel advice</Term>
                <Definition block styleName="TravelAdvice">
                    <InnerHTML>
                        {travelAdvice}
                    </InnerHTML>
                </Definition>
            </List>
        </Section>
    )
}

export default CSSModules(TerrainSummary, styles)
