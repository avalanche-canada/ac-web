import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {compose} from 'recompose'
import Section from 'components/mountainInformationNetwork/Section'
import {asTermAndDefinition} from 'components/description/utils'
import {List, Term, Definition} from 'components/description'
import styles from './HotZoneReport.css'

const {keys} = Object

TerrainSummary.propTypes = {
    title: PropTypes.string.isRequired,
    aspect: PropTypes.object.isRequired,
    terrainFeatures: PropTypes.object.isRequired,
    terrainAvoidanceComments: PropTypes.string,
}

function AvoidList({items}) {
    return (
        <ul styleName='List'>
            {keys(items).map(name => (
                <li key={name} styleName={items[name] ? 'Avoid' : 'Okay'}>
                    {name}
                </li>
            ))}
        </ul>
    )
}

AvoidList = CSSModules(AvoidList, styles)

export default function TerrainSummary({
    title,
    aspect: {All, ...aspect},
    terrainFeatures,
    terrainAvoidanceComments
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
                <Term block >Travel advice</Term>
                <Definition block >{terrainAvoidanceComments}</Definition>
            </List>
        </Section>
    )
}
