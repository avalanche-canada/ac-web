import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Headline from './Headline'
import Footer from './Footer'
import ArchiveWarning from './ArchiveWarning'
import { Table, Day, DaySet, Condition, Confidence } from './danger'
import ProblemSet from './problem'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import DetailSet from './DetailSet'

export default class Forecast extends PureComponent {
    static render(forecast) {
        return (
            <Forecast
                date={forecast.get('date')}
                highlights={forecast.get('highlights')}
                avalancheSummary={forecast.get('avalancheSummary')}
                snowpackSummary={forecast.get('snowpackSummary')}
                weatherForecast={forecast.get('weatherForecast')}
                problems={forecast.get('problems').toJS()}
                dangerMode={forecast.get('dangerMode')}
                dangerRatings={forecast.get('dangerRatings').toJS()}
                confidence={forecast.get('confidence').toObject()}
                isArchived={forecast.get('isArchived')}
                region={forecast.get('region')}
            />
        )
    }
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
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
    render() {
        const {
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
            date,
        } = this.props

        return (
            <section>
                {isArchived && <ArchiveWarning region={region} date={date} />}
                <Headline>{highlights}</Headline>
                <Tabs theme="LOOSE">
                    <HeaderSet>
                        <Header>Danger ratings</Header>
                        <Header disabled={problems.length === 0}>
                            Problems
                        </Header>
                        <Header>Details</Header>
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
                <Footer region={region} />
            </section>
        )
    }
}
