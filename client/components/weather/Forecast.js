import React from 'react'
import PropTypes from 'prop-types'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import parse from 'date-fns/parse'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import { StructuredText } from 'prismic/components/base'
import Tutorial from 'layouts/weather/forecast/Tutorial'
import { FormattedMessage } from 'react-intl'

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
}

export default function Forecast({ forecast }) {
    const { date } = forecast
    // Long range launching date was November 27th, 2017, yeah! on my birthday ;)
    const isDay5To7TabVisible = isAfter(date, new Date(2017, 10, 26))

    return (
        <Tabs>
            <HeaderSet>
                <Header>
                    <FormattedMessage
                        description="Component weather/Forecast"
                        defaultMessage="Synopsis"
                    />
                </Header>
                <Header>
                    <FormattedMessage
                        description="Component weather/Forecast"
                        defaultMessage="Day 1"
                    />
                </Header>
                <Header>
                    <FormattedMessage
                        description="Component weather/Forecast"
                        defaultMessage="Day 2"
                    />
                </Header>
                <Header>
                    <FormattedMessage
                        description="Component weather/Forecast"
                        defaultMessage="Day 3-4"
                    />
                </Header>
                {isDay5To7TabVisible && (
                    <Header>
                        <FormattedMessage
                            description="Component weather/Forecast"
                            defaultMessage="Day 5-7"
                        />
                    </Header>
                )}
                <Header>
                    <FormattedMessage
                        description="Component weather/Forecast"
                        defaultMessage="Tutorial"
                    />
                </Header>
            </HeaderSet>
            <PanelSet>
                <Panel>{createPanel(forecast, Synopsis, 'synopsis')}</Panel>
                <Panel>{createPanel(forecast, Day1, 'day-1')}</Panel>
                <Panel>{createPanel(forecast, Day2, 'day-2')}</Panel>
                <Panel>{createPanel(forecast, Day3To4, 'day-3-to-4')}</Panel>
                {isDay5To7TabVisible && (
                    <Panel>
                        {createPanel(forecast, Day5To7, 'day-5-to-7')}
                    </Panel>
                )}
                <Panel>
                    <Tutorial uid="weather" />
                </Panel>
            </PanelSet>
        </Tabs>
    )
}

// Utils
function createPanel(forecast, Component, name) {
    const date = parse(forecast.date)
    const group = forecast[name]
    const slices = forecast[`${name}-more`] || group
    const props = { date }

    if (Component === Day5To7 && isBefore(date, new Date(2017, 11, 25))) {
        return (
            <Component {...props}>
                <StructuredText value={group} />)
            </Component>
        )
    }

    if (Array.isArray(group)) {
        Object.assign(props, group[0])
    }

    return (
        <Component {...props}>
            <SliceSet slices={slices} />
        </Component>
    )
}
