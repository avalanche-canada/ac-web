import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import TabSet, { HeaderSet, Header, PanelSet, Panel } from '~/components/tabs'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import Tutorial from '~/containers/WeatherTutorial'
import { StructuredText } from '~/prismic/components/base'
import TABS, {
    SYNOPSIS,
    DAY1,
    DAY2,
    DAY3TO4,
    DAY5TO7,
} from '~/components/weather/tabs'

const TABS_PROPS = new Map([
    [
        SYNOPSIS,
        {
            name: 'synopsis',
            title: 'Synopsis',
            component: Synopsis,
        },
    ],
    [
        DAY1,
        {
            name: 'day1',
            title: 'Day 1',
            component: Day1,
        },
    ],
    [
        DAY2,
        {
            name: 'day2',
            title: 'Day 2',
            component: Day2,
        },
    ],
    [
        DAY3TO4,
        {
            name: 'day3To4',
            title: 'Day 3-4',
            component: Day3To4,
        },
    ],
    [
        DAY5TO7,
        {
            name: 'day5To7',
            title: 'Day 5-7',
            component: Day5To7,
        },
    ],
])

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
}

export default function Forecast({ forecast = {} }) {
    const { date } = forecast

    return (
        <TabSet activeIndex={4}>
            <HeaderSet>
                {TABS.map(id => {
                    const { name, title } = TABS_PROPS.get(id)

                    return <Header key={name}>{title}</Header>
                })}
                <Header>Tutorials</Header>
            </HeaderSet>
            <PanelSet>
                {TABS.map(id => {
                    const props = { date }
                    const { component, name } = TABS_PROPS.get(id)
                    const group = forecast[name]
                    const slices = forecast[`${name}More`] || group
                    let children

                    if (id === DAY5TO7) {
                        children = <StructuredText value={group} />
                    } else {
                        if (Array.isArray(group)) {
                            Object.assign(props, group[0])
                        }

                        children = <SliceSet slices={slices} />
                    }

                    return (
                        <Panel key={name}>
                            {createElement(component, props, children)}
                        </Panel>
                    )
                })}
                <Panel>
                    <Tutorial uid="weather" />
                </Panel>
            </PanelSet>
        </TabSet>
    )
}
