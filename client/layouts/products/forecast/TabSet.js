import React from 'react'
import { Consumer } from './Context'
import { Table, Day, DaySet, Condition, Confidence } from './danger'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import DetailSet from './DetailSet'
import ProblemSet from './problem'

export default function TabSet(props) {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <Tabs theme="LOOSE" {...props}>
                        <HeaderSet>
                            <Header>Danger ratings</Header>
                            <Header>Problems</Header>
                            <Header>Details</Header>
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
