import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {InnerHTML} from 'components/misc'
import Panel, {INVERSE} from 'components/panel'
import {Term} from 'components/description'
import Comment from 'components/mountainInformationNetwork/Comment'
import Section from 'components/mountainInformationNetwork/Section'
import styles from './HotZoneReport.css'

const Headers = new Map([
    ['goodTerrainChoices', 'Good Terrain Choices'],
    ['terrainToWatch', 'Terrain to Watch'],
    ['terrainToAvoid', 'Terrain to Avoid'],
])

function createItem({feature, where, elevation}) {
    return [feature, where, elevation].join(' ')
}

TerrainAdviceSet.propTypes = {
    report: PropTypes.object.isRequired,
}

function TerrainAdviceSet({report}) {
    if (!report) {
        return null
    }

    const keys = Array.from(Headers.keys()).filter(key => Boolean(report[key]))

    return (
        <div>
            {keys.map(key => {
                const items = report[key].map(createItem)

                return (
                    <Panel header={Headers.get(key)} expanded expandable theme={INVERSE}>
                        <Section title='Advices'>
                            <ul styleName='AdviceSet'>
                                {items.map(item =>
                                    <li styleName='Advice'>
                                        {item}
                                    </li>
                                )}
                            </ul>
                        </Section>
                        <Comment>
                            <InnerHTML>
                                {report[`${key}Comment`]}
                            </InnerHTML>
                        </Comment>
                    </Panel>
                )
            }
            )}
        </div>
    )
}

export default CSSModules(TerrainAdviceSet, styles)
