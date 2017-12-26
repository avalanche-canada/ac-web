import React from 'react'
import PropTypes from 'prop-types'
import Problem from './Problem'
import TopicSet from './TopicSet'
import Topic from './Topic'
import Advice from './Advice'
import Comment from './Comment'

Set.propTypes = {
    problems: PropTypes.array.isRequired,
}

export default function Set({ problems }) {
    return problems.map(
        ({ type, icons, comment, travelAndTerrainAdvice }, index) => (
            <Problem
                key={type}
                title={`Avalanche Problem ${index + 1}: ${type}`}>
                <TopicSet>
                    <Topic title="What Elevation?" src={icons.elevations} />
                    <Topic title="Which Slopes?" src={icons.aspects} />
                    <Topic
                        title="Chances of Avalanches?"
                        src={icons.likelihood}
                    />
                    <Topic title="Expected Size?" src={icons.expectedSize} />
                </TopicSet>
                <Comment>{comment}</Comment>
                <Advice>{travelAndTerrainAdvice}</Advice>
            </Problem>
        )
    )
}
