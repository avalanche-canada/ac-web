import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { InnerHTML } from 'components/misc'
import { useForecast } from './Context'
import DetailSet from './DetailSet'
import { Day, DaySet, Condition, Confidence, Advice } from './danger'
import ProblemSet from './problem'
import NoRatingModes from 'constants/forecast/mode'

TabSet.propTypes = {
    onTabChange: PropTypes.func,
}

export default function TabSet({ onTabChange = noop }) {
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
        avidOffseasonMessage,
        avidOffseasonComment,
    } = forecast

    return (
        <Tabs onTabChange={onTabChange}>
            <HeaderSet>
                <Header>Danger ratings</Header>
                <Header>Problems</Header>
                <Header>Details</Header>
            </HeaderSet>
            <PanelSet>
                <Panel>
                    {NoRatingModes.has(dangerMode) ? (
                        <Condition
                            mode={dangerMode}
                            message={
                                avidOffseasonMessage && (
                                    <InnerHTML>
                                        {avidOffseasonMessage}
                                    </InnerHTML>
                                )
                            }>
                            {avidOffseasonComment && (
                                <InnerHTML>{avidOffseasonComment}</InnerHTML>
                            )}
                        </Condition>
                    ) : (
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
                    {avidConfidence ? (
                        <Confidence level={avidConfidence.rating}>
                            <ul>
                                {avidConfidence.statements.map(
                                    (statement, index) => (
                                        <li key={index}>{statement}</li>
                                    )
                                )}
                            </ul>
                        </Confidence>
                    ) : (
                        <Confidence level={confidence.level}>
                            {confidence.comment}
                        </Confidence>
                    )}
                </Panel>
            </PanelSet>
        </Tabs>
    )
}
