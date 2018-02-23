import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import { Table, Day, DaySet, Condition, Confidence } from './danger'
import ProblemSet from './problem'
import DetailSet from './DetailSet'
import { handleForecastTabActivate } from 'services/analytics'

export default class TabSet extends PureComponent {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
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
        region: PropTypes.string.isRequired,
    }
    handleTabChange = index => {
        handleForecastTabActivate(HEADERS[index])
    }
    render() {
        const {
            avalancheSummary,
            snowpackSummary,
            weatherForecast,
            problems,
            dangerMode,
            dangerRatings,
            confidence,
        } = this.props

        return (
            <Tabs theme="LOOSE" onTabChange={this.handleTabChange}>
                <HeaderSet>
                    <Header>{HEADERS[0]}</Header>
                    <Header disabled={problems.length === 0}>
                        {HEADERS[1]}
                    </Header>
                    <Header>{HEADERS[2]}</Header>
                </HeaderSet>
                <PanelSet>
                    <Panel>
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
}

// Constants
const HEADERS = ['Danger ratings', 'Problems', 'Details']
