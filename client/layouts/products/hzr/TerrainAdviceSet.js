import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import Comment from 'layouts/products/min/Comment'
import Section from 'layouts/products/min/Section'
import { StructuredText } from 'prismic/components/base'
import AdviceText from './AdviceText'
import Panel from './Panel'
import styles from './HotZoneReport.css'

function createAdvice({ feature, where, elevation }) {
    const items = [feature, where, elevation].filter(Boolean)

    return items.length === 0 ? null : items
}

function AdviceSection({ header, advices }) {
    if (!Array.isArray(advices) || advices.length === 0) {
        return null
    }

    const items = advices.map(createAdvice).filter(Boolean)

    if (items.length === 0) {
        return null
    }

    return (
        <div className={styles['Advice--Section']}>
            <Section title={header}>
                <ul className={styles.AdviceSet}>
                    {items.map((advice, index) => (
                        <li key={index} className={styles.Advice}>
                            {advice.join(' ')}
                        </li>
                    ))}
                </ul>
            </Section>
        </div>
    )
}

class TerrainAdviceSetComponent extends PureComponent {
    static propTypes = {
        terrainAdviceComment: PropTypes.array,
        terrainToAvoid: PropTypes.array,
        terrainToAvoidComment: PropTypes.array,
        terrainToWatch: PropTypes.array,
        terrainToWatchComment: PropTypes.array,
        goodTerrainChoices: PropTypes.array,
        goodTerrainChoicesComment: PropTypes.array,
    }
    get comments() {
        // Legacy comments structure
        // Previously, every advice sets had its own comment, now only
        // the travel advice has a comment.
        const {
            terrainAdviceComment,
            terrainToAvoidComment,
            terrainToWatchComment,
            goodTerrainChoicesComment,
        } = this.props

        const comments = [
            terrainAdviceComment,
            terrainToAvoidComment,
            terrainToWatchComment,
            goodTerrainChoicesComment,
        ].filter(Boolean)

        if (comments.length > 0) {
            return (
                <div className={styles['Advice--Comment']}>
                    <Comment>
                        {comments.map((comment, index) => (
                            <StructuredText key={index} value={comment} />
                        ))}
                    </Comment>
                </div>
            )
        } else {
            return null
        }
    }
    get advices() {
        const {
            terrainToAvoid,
            terrainToWatch,
            goodTerrainChoices,
        } = this.props
        const advices = [terrainToAvoid, terrainToWatch, goodTerrainChoices]

        if (!advices.some(Boolean)) {
            return null
        }

        return (
            <Fragment>
                <AdviceSection
                    header="Terrain to Avoid"
                    advices={terrainToAvoid}
                />
                <AdviceSection
                    header="Terrain to Watch"
                    advices={terrainToWatch}
                />
                <AdviceSection
                    header="Good Terrain Choices"
                    advices={goodTerrainChoices}
                />
            </Fragment>
        )
    }
    render() {
        const { advices, comments } = this

        if (comments === null && advices === null) {
            return null
        }

        return (
            <Panel header="Terrain Advice" expanded>
                <AdviceText />
                {advices}
                {comments}
            </Panel>
        )
    }
}

export default function TerrainAdviceSet() {
    return (
        <Consumer>
            {report =>
                report ? <TerrainAdviceSetComponent {...report} /> : null
            }
        </Consumer>
    )
}
