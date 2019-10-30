import React from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from 'components/misc'
import classnames from 'classnames'
import { useClientRect } from 'hooks'
import styles from './Problem.css'

ProblemSet.propTypes = {
    problems: PropTypes.array.isRequired,
}

export default function ProblemSet({ problems }) {
    if (problems.length === 0) {
        return <h3>No problems identified.</h3>
    }

    return problems.map(renderProblem)
}

Problem.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

function Problem({ title, children }) {
    return (
        <div className={styles.Container}>
            <h2 className={styles.Header}>{title}</h2>
            {children}
        </div>
    )
}

Advice.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
}

function Advice({ children }) {
    return (
        <div className={styles.Advice}>
            <h3 className={styles.SubHeader}>Travel and Terrain Advice</h3>
            <InnerHTML>{children}</InnerHTML>
        </div>
    )
}

Comment.propTypes = {
    children: PropTypes.string.isRequired,
}

function Comment({ children }) {
    return (
        <div className={styles.Comment}>
            <InnerHTML>{children}</InnerHTML>
        </div>
    )
}

Topic.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Topic({ title, src }) {
    return (
        <figure className={styles.Topic}>
            <div className={styles['Topic--Content']}>
                <img src={src} />
            </div>
            <figcaption>{title}</figcaption>
        </figure>
    )
}

TopicSet.propTypes = {
    children: PropTypes.node.isRequired,
}

function TopicSet({ children }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })
    const className = classnames({
        [styles.TopicSet]: true,
        [styles['TopicSet--2PerRow']]: width > 300 && width < 650,
        [styles['TopicSet--4PerRow']]: width > 650,
    })

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

// Utils
function renderProblem(problem, index) {
    const { type, icons, comment, travelAndTerrainAdvice } = problem

    return (
        <Problem key={index} title={`Avalanche Problem ${index + 1}: ${type}`}>
            <TopicSet>
                <Topic title="What Elevation?" src={icons.elevations} />
                <Topic title="Which Slopes?" src={icons.aspects} />
                <Topic title="Chances of Avalanches?" src={icons.likelihood} />
                <Topic title="Expected Size?" src={icons.expectedSize} />
            </TopicSet>
            <Comment>{comment}</Comment>
            {travelAndTerrainAdvice && (
                <Advice>{travelAndTerrainAdvice}</Advice>
            )}
        </Problem>
    )
}
