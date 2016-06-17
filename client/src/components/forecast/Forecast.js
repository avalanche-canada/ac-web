import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Headline from './Headline'
import Summary from './Summary'
import Footer from './Footer'
import {Table, Day, Condition} from './danger'
import {Problem, Topic, Advice, Comment} from './problem'
import {Article, Header, Section} from 'components/page'
import {Metadata, Entry} from 'components/metadata'
import {TabSet, Tab, LOOSE} from 'components/tab'
import {DateTime} from 'components/misc'
import styles from './Forecast.css'

Forecast.propTypes = {
    title: PropTypes.string.isRequired,
    dateIssued: PropTypes.instanceOf(Date).isRequired,
    validUntil: PropTypes.instanceOf(Date).isRequired,
    forecaster: PropTypes.string.isRequired,
    highlights: PropTypes.string.isRequired,
}

function Forecast({
    title,
    dateIssued,
    validUntil,
    forecaster,
    highlights,
    avalancheSummary,
    snowpackSummary,
    weatherForecast,
    problems,
    dangerMode,
    dangerRatings,
    confidence,
}) {
    return (
        <Article>
            <Header>
                <h1>{title}</h1>
                <Metadata>
                    <Entry term='Date Issued'>
                        <DateTime value={dateIssued} format='EEE MMMM d, h:mm a' />
                    </Entry>
                    <Entry term='Valid Until'>
                        <DateTime value={validUntil} format='EEE MMMM d, h:mm a' />
                    </Entry>
                </Metadata>
            </Header>
            <Section>
                <Headline>{highlights}</Headline>
                <TabSet theme={LOOSE}>
                    <Tab header='Public Avalanche Forecast'>
                        <Condition mode={dangerMode} date={dates[0]} />
                        <Table mode={dangerMode} confidence={confidence}>
                            {dangerRatings.map(({date, dangerRating}) => (
                                <Day date={date} {...dangerRating} />
                            ))}
                        </Table>
                        {problems.map(({type, icons, comment, travelAndTerrainAdvice}) => (
                            <Problem title={type} >
                                <Topic title='What Elevation?' src={icons.elevations} />
                                <Topic title='Which Slopes?' src={icons.aspects} />
                                <Topic title='Chances of Avalanches?' src={icons.likelihood} />
                                <Topic title='Expected Size?' src={icons.expectedSize} />
                                <Comment>{comment}</Comment>
                                <Advice>{travelAndTerrainAdvice}</Advice>
                            </Problem>
                        ))}
                        <Footer author={forecaster} />
                    </Tab>
                    <Tab header='Forecast Details'>
                        <Summary title='Avalanche Summary'>{avalancheSummary}</Summary>
                        <Summary title='Snowpack Summary'>{snowpackSummary}</Summary>
                        <Summary title='Weather Forecast'>{weatherForecast}</Summary>
                    </Tab>
                </TabSet>
            </Section>
        </Article>
    )
}

export default CSSModules(Forecast, styles)
