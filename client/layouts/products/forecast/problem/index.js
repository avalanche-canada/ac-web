import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { InnerHTML } from 'components/misc'
import { useClientRect } from 'hooks'
import styles from './Problem.css'

ProblemSet.propTypes = {
    problems: PropTypes.array.isRequired,
}

export default function ProblemSet({ problems }) {
    if (problems.length === 0) {
        return (
            <h3>
                <FormattedMessage defaultMessage="No problems identified." />
            </h3>
        )
    }

    return problems.map(renderProblem)
}

// Utils components
Problem.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

function Problem({ title, children }) {
    const [{ width }, ref] = useClientRect({ width: window.innerWidth })
    const className = classnames(styles.Container, {
        [styles.Half]: width > 300 && width < 675,
        [styles.Quarter]: width >= 675,
    })

    return (
        <section ref={ref} className={className}>
            <h2 className={styles.Header}>{title}</h2>
            {children}
        </section>
    )
}

Advice.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
}

function Advice({ children }) {
    return (
        <div className={styles.Advice}>
            <h3 className={styles.SubHeader}>
                <FormattedMessage defaultMessage="Travel and Terrain Advice" />
            </h3>
            <InnerHTML>{children}</InnerHTML>
        </div>
    )
}

Comment.propTypes = {
    children: PropTypes.string.isRequired,
}

function Comment({ children }) {
    return <InnerHTML className={styles.Comment}>{children}</InnerHTML>
}

Figure.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Figure({ title, src }) {
    return (
        <figure className={styles.Figure}>
            <figcaption>{title}</figcaption>
            <div>
                <img src={src} />
            </div>
        </figure>
    )
}

// Utils
// TODO Remove the double bottom border when the comment is empty.
// Tried a soluton in CSS only, and it is not complete.
// I do not want to test for <p></p> and make the border disappear.
function renderProblem(problem, index) {
    const intl = useIntl()
    const { type, icons, comment, travelAndTerrainAdvice } = problem
    const title = intl.formatMessage({
        defaultMessage: 'Avalanche Problem {counter}: {title}',
        values: {
            count: index + 1,
            title: type,
        },
    })

    return (
        <Problem key={index} title={title}>
            <Figure
                title={intl.formatMessage({
                    defaultMessage: 'What Elevation?',
                })}
                src={icons.elevations}
            />
            <Figure
                title={intl.formatMessage({
                    defaultMessage: 'Which Slopes?',
                })}
                src={icons.aspects}
            />
            <Figure
                title={intl.formatMessage({
                    defaultMessage: 'Chances of Avalanches?',
                })}
                src={icons.likelihood}
            />
            <Figure
                title={intl.formatMessage({
                    defaultMessage: 'Expected Size?',
                })}
                src={icons.expectedSize}
            />
            <Comment>{comment}</Comment>
            {travelAndTerrainAdvice && (
                <Advice>{travelAndTerrainAdvice}</Advice>
            )}
        </Problem>
    )
}
