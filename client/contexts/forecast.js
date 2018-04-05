import React, { Fragment, createContext } from 'react'
import * as Components from 'components/forecast'
import {
    Table,
    Day,
    DaySet,
    Condition,
    Confidence,
} from 'components/forecast/danger'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { handleForecastTabActivate } from 'services/analytics'

const { Provider, Consumer } = createContext()

export function Forecast({ children, value }) {
    return (
        <Provider value={value}>
            {children || (
                <Fragment>
                    <Metadata />
                    <ArchiveWarning />
                    <Headline />
                    <TabSet />
                    <Footer />
                </Fragment>
            )}
        </Provider>
    )
}

export function Metadata(props) {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <Components.Metadata
                        {...props}
                        dateIssued={forecast.dateIssued}
                        validUntil={forecast.validUntil}
                        forecaster={forecast.forecaster}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function ArchiveWarning(props) {
    return (
        <Consumer>
            {forecast =>
                forecast && forecast.isArchived ? (
                    <Components.ArchiveWarning
                        {...props}
                        region={forecast.region}
                        date={forecast.date}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function Headline(props) {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <Components.Headline {...props}>
                        {forecast.highlights}
                    </Components.Headline>
                ) : null
            }
        </Consumer>
    )
}

export function TabSet({ props }) {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <Tabs theme="LOOSE" onTabChange={handleTabChange}>
                        <HeaderSet>
                            <Header>{HEADERS[0]}</Header>
                            <Header disabled={forecast.problems.length === 0}>
                                {HEADERS[1]}
                            </Header>
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
                                <Components.ProblemSet
                                    problems={forecast.problems}
                                />
                            </Panel>
                            <Panel>
                                <Components.DetailSet
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

export function Footer(props) {
    return (
        <Consumer>
            {forecast =>
                forecast ? (
                    <Components.Footer
                        {...props}
                        region={forecast.region}
                        date={forecast.date}
                    />
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
