import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {compose} from 'recompose'
import Section from 'components/mountainInformationNetwork/Section'
import {List, Term, Definition} from 'components/description'
import {InnerHTML} from 'components/misc'
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

function AvoidList({items}) {
    return (
        <ul styleName='List'>
            {Object.keys(items).map(name => (
                <li key={name} styleName={items[name] ? 'Avoid' : 'Okay'}>
                    {Titles.get(name) || name}
                </li>
            ))}
        </ul>
    )
}

AvoidList = CSSModules(AvoidList, styles)

function TerrainSummary({title, aspect, terrainFeatures, travelAdvice}) {
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
                <Term block >Travel advice</Term>
                <Definition block styleName='TravelAdvice'>
                    <InnerHTML>
                        {travelAdvice}
                    </InnerHTML>
                </Definition>
            </List>
        </Section>
    )
}

export default CSSModules(TerrainSummary, styles)
