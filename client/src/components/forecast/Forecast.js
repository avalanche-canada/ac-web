import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import Headline from './Headline'
import Summary from './Summary'
import Footer from './Footer'
import ArchiveWarning from './ArchiveWarning'
import {Table, Day, DaySet, Condition, Confidence} from './danger'
import {Problem, Topic, TopicSet, Advice, Comment} from './problem'
import {Article, Header} from 'components/page'
import {Metadata, Entry} from 'components/metadata'
import {TabSet, Tab, LOOSE} from 'components/tab'
import styles from './Forecast.css'

Forecast.propTypes = {
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
    dateIssued,
    validUntil,
    date,
}) {
    return (
        <section>
            {isArchived && <ArchiveWarning region={region} date={date} />}
            <Headline>{highlights}</Headline>
            <TabSet theme={LOOSE}>
                <Tab title='Danger ratings'>
                    <Condition mode={dangerMode} />
                    <Table mode={dangerMode}>
                        <DaySet>
                            {dangerRatings.map(({date, dangerRating}, index) => (
                                <Day key={index} date={date} {...dangerRating} />
                            ))}
                        </DaySet>
                        <Confidence {...confidence} />
                    </Table>
                </Tab>
                <Tab title='Problems' disabled={problems.length === 0}>
                    {problems.map(({type, icons, comment, travelAndTerrainAdvice}, index) => (
                        <Problem key={type} title={`Avalanche Problem ${index + 1}: ${type}`} >
                            <TopicSet>
                                <Topic title='What Elevation?' src={icons.elevations} />
                                <Topic title='Which Slopes?' src={icons.aspects} />
                                <Topic title='Chances of Avalanches?' src={icons.likelihood} />
                                <Topic title='Expected Size?' src={icons.expectedSize} />
                            </TopicSet>
                            <Comment>{comment}</Comment>
                            <Advice>{travelAndTerrainAdvice}</Advice>
                        </Problem>
                    ))}
                </Tab>
                <Tab title='Details'>
                    {avalancheSummary &&
                        <Summary title='Avalanche Summary'>
                            {avalancheSummary}
                        </Summary>
                    }
                    {snowpackSummary &&
                        <Summary title='Snowpack Summary'>
                            {snowpackSummary}
                        </Summary>
                    }
                    {weatherForecast &&
                        <Summary title='Weather Forecast'>
                            {weatherForecast}
                        </Summary>
                    }
                    {weatherForecast &&
                        <p>
                            More details can be found on the <Link to='/weather'>Mountain Weather Forecast</Link>.
                        </p>
                    }
                </Tab>
            </TabSet>
            <Footer region={region} />
        </section>
    )
}
