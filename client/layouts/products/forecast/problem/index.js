import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Problem from './Problem'
import TopicSet from './TopicSet'
import Topic from './Topic'
import Advice from './Advice'
import Comment from './Comment'

ProblemSet.propTypes = {
    problems: PropTypes.array.isRequired,
}

export default function ProblemSet({ problems }) {
    if (problems.length === 0) {
        return <h3>No problems identified.</h3>
    }

    return <Fragment>{problems.map(renderProblem)}</Fragment>
}

function renderProblem(problem, index) {
    const { type, icons, comment, travelAndTerrainAdvice } = problem

    return (
        <Problem title={`Avalanche Problem ${index + 1}: ${type}`}>
            <TopicSet>
                <Topic title="What Elevation?" src={icons.elevations} />
                <Topic title="Which Slopes?" src={icons.aspects} />
                <Topic title="Chances of Avalanches?" src={icons.likelihood} />
                <Topic title="Expected Size?" src={icons.expectedSize} />
            </TopicSet>
            <Comment>{comment}</Comment>
            <Advice>{travelAndTerrainAdvice}</Advice>
        </Problem>
    )
}
