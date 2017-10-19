import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from '~/components/tabs'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import Tutorial from '~/containers/WeatherTutorial'
import TABS, { DAY5TO7 } from '~/components/weather/tabs'

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.oneOf(TABS)),
}

export default function Forecast({ forecast = {}, tabs = TABS }) {
    const hasDay5To7 =
        tabs.includes(DAY5TO7) && !forecast[name] && !forecast[`${name}More`]

    return (
        <Tabs>
            <HeaderSet>
                <Header>Synopsis</Header>
                <Header>Day 1</Header>
                <Header>Day 2</Header>
                <Header>Day 3-4</Header>
                {hasDay5To7 && <Header>Day 5-7</Header>}
                <Header>Tutorial</Header>
            </HeaderSet>
            <PanelSet>
                <Panel>{createPanel(Synopsis, 'synopsis', forecast)}</Panel>
                <Panel>{createPanel(Day1, 'day1', forecast)}</Panel>
                <Panel>{createPanel(Day2, 'day2', forecast)}</Panel>
                <Panel>{createPanel(Day3To4, 'day3To4', forecast)}</Panel>
                {hasDay5To7 && (
                    <Panel>{createPanel(Day5To7, 'day5To7', forecast)}</Panel>
                )}
                <Panel>
                    <Tutorial uid="weather" />
                </Panel>
            </PanelSet>
        </Tabs>
    )
}

function createPanel(component, name, forecast) {
    const group = forecast[name]
    const slices = forecast[`${name}More`] || group

    if (!group && !slices) {
        return null
    }
    const props = {
        date: forecast.date,
    }

    if (Array.isArray(group)) {
        Object.assign(props, group[0])
    }

    const children = <SliceSet slices={slices} />

    return createElement(component, props, children)
}
