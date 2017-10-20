import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Panel, { INVERSE } from 'components/panel'
import Comment from 'components/mountainInformationNetwork/Comment'
import Section from 'components/mountainInformationNetwork/Section'
import { StructuredText } from 'prismic/components/base'
import styles from './HotZoneReport.css'
import AdviceText from './AdviceText'

const Headers = new Map([
    ['terrainToAvoid', 'Terrain to Avoid'],
    ['terrainToWatch', 'Terrain to Watch'],
    ['goodTerrainChoices', 'Good Terrain Choices'],
])

function createItem({ feature, where, elevation }) {
    return [feature, where, elevation].filter(Boolean).join(' ')
}

TerrainAdviceSet.propTypes = {
    report: PropTypes.object.isRequired,
}

function TerrainAdviceSet({ report }) {
    if (!report) {
        return null
    }

    const comments = [report.terrainAdviceComment]
    const keys = Array.from(Headers.keys()).filter(
        key => Array.isArray(report[key]) && report[key].length > 0
    )

    if (keys.length === 0) {
        return null
    }

    return (
        <Panel header="Terrain Advice" expanded expandable theme={INVERSE}>
            <AdviceText />
            {keys.map(key => {
                const items = report[key].map(createItem).filter(Boolean)
                // Legacy comments structure
                // Previously, every advice sets had its own comment, now only
                // the travel advice has a comment.
                comments.push(report[`${key}Comment`])

                return items.length > 0
                    ? <div key={key} styleName="Advice--Section">
                          <Section title={Headers.get(key)}>
                              <ul styleName="AdviceSet">
                                  {items.map((item, index) => (
                                      <li key={index} styleName="Advice">
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </Section>
                      </div>
                    : null
            })}
            {comments.filter(Boolean).length > 0 &&
                <div styleName="Advice--Comment">
                    <Comment>
                        {comments
                            .filter(Boolean)
                            .map((comment, index) => (
                                <StructuredText key={index} value={comment} />
                            ))}
                    </Comment>
                </div>}
        </Panel>
    )
}

export default CSSModules(TerrainAdviceSet, styles)
