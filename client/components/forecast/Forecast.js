import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Headline from './Headline'
import Summary from './Summary'
import Footer from './Footer'
import ArchiveWarning from './ArchiveWarning'
import { Table, Day, DaySet, Condition, Confidence } from './danger'
import { Problem, Topic, TopicSet, Advice, Comment } from './problem'
import { TabSet, Tab, LOOSE } from 'components/tab'
import { InnerHTML } from 'components/misc'

Forecast.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    highlights: PropTypes.string,
    avalancheSummary: PropTypes.string,
    snowpackSummary: PropTypes.string,
    weatherForecast: PropTypes.string,
    problems: PropTypes.array,
    dangerMode: PropTypes.string,
    dangerRatings: PropTypes.array,
    confidence: PropTypes.shape({
        level: PropTypes.string,
        comment: PropTypes.string,
    }),
    isArchived: PropTypes.bool.isRequired,
    region: PropTypes.string.isRequired,
}

export default function Forecast({
    highlights,
    avalancheSummary,
    snowpackSummary,
    weatherForecast,
    problems,
    dangerMode,
    dangerRatings,
    confidence,
    isArchived,
    region,
    date,
}) {
    return (
        <section>
            {isArchived && <ArchiveWarning region={region} date={date} />}
            <Headline>{highlights}</Headline>
            <TabSet stacked={false} theme={LOOSE}>
                <Tab title="Danger ratings">
                    <Condition mode={dangerMode} />
                    <Table mode={dangerMode}>
                        <DaySet>
                            {dangerRatings.map(
                                ({ date, dangerRating }, index) => (
                                    <Day
                                        key={index}
                                        date={date}
                                        {...dangerRating}
                                    />
                                )
                            )}
                        </DaySet>
                        <Confidence {...confidence} />
                    </Table>
                </Tab>
                <Tab title="Problems" disabled={problems.length === 0}>
                    {problems.map(
                        (
                            { type, icons, comment, travelAndTerrainAdvice },
                            index
                        ) => (
                            <Problem
                                key={type}
                                title={`Avalanche Problem ${index + 1}: ${type}`}>
                                <TopicSet>
                                    <Topic
                                        title="What Elevation?"
                                        src={icons.elevations}
                                    />
                                    <Topic
                                        title="Which Slopes?"
                                        src={icons.aspects}
                                    />
                                    <Topic
                                        title="Chances of Avalanches?"
                                        src={icons.likelihood}
                                    />
                                    <Topic
                                        title="Expected Size?"
                                        src={icons.expectedSize}
                                    />
                                </TopicSet>
                                <Comment>{comment}</Comment>
                                <Advice>{travelAndTerrainAdvice}</Advice>
                            </Problem>
                        )
                    )}
                </Tab>
                <Tab title="Details">
                    <Summary title="Avalanche Summary">
                        <InnerHTML>
                            {avalancheSummary}
                        </InnerHTML>
                    </Summary>
                    <Summary title="Snowpack Summary">
                        <InnerHTML>
                            {snowpackSummary}
                        </InnerHTML>
                    </Summary>
                    <Summary title="Weather Forecast">
                        <InnerHTML>
                            {weatherForecast}
                        </InnerHTML>
                        <p>
                            More details can be found on the
                            {' '}
                            <Link to="/weather">Mountain Weather Forecast</Link>
                            .
                        </p>
                    </Summary>
                </Tab>
            </TabSet>
            <Footer region={region} />
        </section>
    )
}
