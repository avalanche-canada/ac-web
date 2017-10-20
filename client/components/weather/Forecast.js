import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import Tabs, { HeaderSet, Header, PanelSet, Panel } from 'components/tabs'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import Tutorial from 'containers/WeatherTutorial'
import TABS, { DAY5TO7 } from 'components/weather/tabs'

export default class Forecast extends PureComponent {
    static propTypes = {
        forecast: PropTypes.object.isRequired,
        tabs: PropTypes.arrayOf(PropTypes.oneOf(TABS)),
    }
    get hasDay5To7() {
        const { forecast, tabs } = this.props

        return (
            tabs.includes(DAY5TO7) && (forecast.day5To7 || forecast.day5To7More)
        )
    }
    get headers() {
        return [
            <Header key="synopsis">Synopsis</Header>,
            <Header key="day1">Day 1</Header>,
            <Header key="day2">Day 2</Header>,
            <Header key="day3To4">Day 3-4</Header>,
            this.hasDay5To7 && <Header key="day5To7">Day 5-7</Header>,
            <Header key="tutorial">Tutorial</Header>,
        ].filter(Boolean)
    }
    get panels() {
        const { forecast } = this.props

        return [
            <Panel key="synopsis">
                {createPanel(Synopsis, 'synopsis', forecast)}
            </Panel>,
            <Panel key="day1">{createPanel(Day1, 'day1', forecast)}</Panel>,
            <Panel key="day2">{createPanel(Day2, 'day2', forecast)}</Panel>,
            <Panel key="day3To4">
                {createPanel(Day3To4, 'day3To4', forecast)}
            </Panel>,
            this.hasDay5To7 && (
                <Panel key="day5To7">
                    {createPanel(Day5To7, 'day5To7', forecast)}
                </Panel>
            ),
            <Panel key="tutorial">
                <Tutorial uid="weather" />
            </Panel>,
        ].filter(Boolean)
    }
    render() {
        return (
            <Tabs>
                <HeaderSet>{this.headers}</HeaderSet>
                <PanelSet>{this.panels}</PanelSet>
            </Tabs>
        )
    }
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
