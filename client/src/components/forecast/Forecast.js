import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Headline from './Headline'
import Summary from './Summary'
import Footer from './Footer'
import {Table, Day, Condition} from './danger'
import {Problem, Topic, Advice, Comment} from './problem'
import {Article, Header} from 'components/page'
import {Metadata, Entry} from 'components/metadata'
import {TabSet, Tab, LOOSE} from 'components/tab'
import Panel from 'components/panel'
import {DateTime} from 'components/misc'
import styles from './Forecast.css'
import EXPLANATION from 'constants/forecast/danger/rating/explanation'
import {Generic} from 'prismic/components'

Forecast.propTypes = {
    forecaster: PropTypes.string,
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
}

export default function Forecast({
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
        <section>
            <Headline>{highlights}</Headline>
            <TabSet theme={LOOSE}>
                <Tab title='Public Avalanche Forecast'>
                    <Condition mode={dangerMode} />
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
                <Tab title='Forecast Details'>
                    {avalancheSummary &&
                        <Summary title='Avalanche Summary'>{avalancheSummary}</Summary>
                    }
                    {snowpackSummary &&
                        <Summary title='Snowpack Summary'>{snowpackSummary}</Summary>
                    }
                    {weatherForecast &&
                        <Summary title='Weather Forecast'>{weatherForecast}</Summary>
                    }
                </Tab>
            </TabSet>
            <div>
                <Panel header='Danger Ratings Explained' expandable>
                    {EXPLANATION}
                </Panel>
                <Panel header='Avalanche Forecasts in your Inbox' expandable>
                    <Generic type='generic' uid='forecast-rss-message' />
                </Panel>
                <Panel header='Forecast Disclaimer' expandable>
                    <Generic type='generic' uid='forecast-disclaimer' />
                </Panel>
            </div>
        </section>
    )
}
