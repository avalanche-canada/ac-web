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

    const {
        dangerMode,
        problems,
        confidence,
        avidConfidence,
        avidTerrainAndTravel,
        dangerRatings,
        avalancheSummary,
        snowpackSummary,
        weatherForecast,
    } = forecast

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
                            {confidence?.level && (
                                <Confidence level={confidence.level}>
                                    {confidence.comment}
                                </Confidence>
                            )}
                            {avidConfidence && (
                                <Confidence level={avidConfidence.rating}>
                                    <ul>
                                        {avidConfidence.statements.map(
                                            (statement, index) => (
                                                <li key={index}>{statement}</li>
                                            )
                                        )}
                                    </ul>
                                </Confidence>
                            )}
                        </Fragment>
                    )}
                    {avidTerrainAndTravel && (
                        <Advice>
                            <ul>
                                {avidTerrainAndTravel.map(
                                    (statement, index) => (
                                        <li key={index}>{statement}</li>
                                    )
                                )}
                            </ul>
                        </Advice>
                    )}
                </Panel>
                <Panel>
                    <ProblemSet problems={problems} />
                </Panel>
                <Panel>
                    <DetailSet
                        avalanche={avalancheSummary}
                        snowpack={snowpackSummary}
                        weather={weatherForecast}
                    />
                </Panel>
            </PanelSet>
        </Tabs>
    )
}
