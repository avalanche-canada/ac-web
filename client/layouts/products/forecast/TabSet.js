import React, { Fragment } from 'react'
import { useForecast } from './Context'
import { Day, DaySet, Condition, Confidence, Advice } from './danger'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import DetailSet from './DetailSet'
import ProblemSet from './problem'
import NoRatingModes from 'constants/forecast/mode'

export default function TabSet(props) {
    const forecast = useForecast()

    if (!forecast) {
        return null
    }

    const { dangerMode, problems, confidence } = forecast

    return (
        <Tabs {...props}>
            <HeaderSet>
                <Header>Danger ratings</Header>
                <Header>Problems</Header>
                <Header>Details</Header>
            </HeaderSet>
            <PanelSet>
                <Panel>
                    {NoRatingModes.has(dangerMode) ? (
                        <Condition mode={dangerMode} />
                    ) : (
                        <Fragment>
                            <DaySet>
                                {forecast.dangerRatings.map(
                                    ({ date, dangerRating }, index) => (
                                        <Day
                                            key={index}
                                            date={date}
                                            {...dangerRating}
                                        />
                                    )
                                )}
                            </DaySet>
                            <Confidence level={confidence.level}>
                                {confidence.comment}
                            </Confidence>
                        </Fragment>
                    )}
                    {forecast.avidTerrainAndTravelAdvice && (
                        <Advice>{forecast.avidTerrainAndTravelAdvice}</Advice>
                    )}
                </Panel>
                <Panel>
                    <ProblemSet problems={problems} />
                </Panel>
                <Panel>
                    <DetailSet
                        avalanche={forecast.avalancheSummary}
                        snowpack={forecast.snowpackSummary}
                        weather={forecast.weatherForecast}
                    />
                </Panel>
            </PanelSet>
        </Tabs>
    )
}
