import React, { memo, createElement } from 'react'
import PropTypes from 'prop-types'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import { StructuredText } from 'prismic/components/base'
import Tutorial from 'layouts/weather/forecast/Tutorial'

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
}

function Forecast({ forecast }) {
    const { date } = forecast
    // Long range launching date was November 27th, 2017, yeah! on my birthday ;)
    const isDay5To7TabVisible = isAfter(date, new Date(2017, 10, 26))

    return (
        <Tabs>
            <HeaderSet>
                <Header>Synopsis</Header>
                <Header>Day 1</Header>
                <Header>Day 2</Header>
                <Header>Day 3-4</Header>
                {isDay5To7TabVisible && <Header>Day 5-7</Header>}
                <Header>Tutorial</Header>
            </HeaderSet>
            <PanelSet>
                <Panel>{createPanel(forecast, Synopsis, 'synopsis')}</Panel>
                <Panel>{createPanel(forecast, Day1, 'day1')}</Panel>
                <Panel>{createPanel(forecast, Day2, 'day2')}</Panel>
                <Panel>{createPanel(forecast, Day3To4, 'day3To4')}</Panel>
                {isDay5To7TabVisible && (
                    <Panel>{createPanel(forecast, Day5To7, 'day5To7')}</Panel>
                )}
                <Panel>
                    <Tutorial uid="weather" />
                </Panel>
            </PanelSet>
        </Tabs>
    )
}

export default memo(Forecast)

// Utils
function createPanel(forecast, component, name) {
    const { date } = forecast
    const group = forecast[name]
    const slices = forecast[`${name}More`] || group
    const props = { date }

    if (component === Day5To7 && isBefore(date, new Date(2017, 11, 25))) {
        return createElement(component, props, <StructuredText value={group} />)
    }

    if (Array.isArray(group)) {
        Object.assign(props, group[0])
    }

    const children = <SliceSet slices={slices} />

    return createElement(component, props, children)
}
