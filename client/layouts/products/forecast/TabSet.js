import React from 'react'
import { Consumer } from './Context'
import { Table, Day, DaySet, Condition, Confidence } from './danger'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { handleForecastTabActivate } from 'services/analytics'
import DetailSet from './DetailSet'
import ProblemSet from './problem'

export default function TabSet(props) {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <Tabs
                        theme="LOOSE"
                        onTabChange={handleTabChange}
                        {...props}>
                        <HeaderSet>
                            <Header>{HEADERS[0]}</Header>
                            <Header>{HEADERS[1]}</Header>
                            <Header>{HEADERS[2]}</Header>
                        </HeaderSet>
                        <PanelSet>
                            <Panel>
                                <Condition mode={forecast.dangerMode} />
                                <Table mode={forecast.dangerMode}>
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
                                    <Confidence {...forecast.confidence} />
                                </Table>
                            </Panel>
                            <Panel>
                                <ProblemSet problems={forecast.problems} />
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
                ) : null
            }
        </Consumer>
    )
}

// Constants
const HEADERS = ['Danger ratings', 'Problems', 'Details']

// Utils
function handleTabChange(index) {
    handleForecastTabActivate(HEADERS[index])
}
