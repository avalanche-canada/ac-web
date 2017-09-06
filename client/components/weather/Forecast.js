import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { TabSet, Tab } from '~/components/tab'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import ExtendedWeatherForecast from './tabs/ExtendedWeatherForecast'
import SliceSet from './tabs/SliceSet'
import Tutorial from '~/containers/WeatherTutorial'
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
        <TabSet>
            {TABS.map(id => {
                const { title, component, name } = TABS_PROPS.get(id)
                const group = forecast[name]
                const slices = forecast[`${name}More`] || group

                if (!group && !slices) {
                    return null
                }
                const props = {
                    date,
                }

                if (Array.isArray(group)) {
                    Object.assign(props, group[0])
                }

                const child = <SliceSet slices={slices} />

                return (
                    <Tab key={name} title={title}>
                        {createElement(component, props, child)}
                    </Tab>
                )
            })}
            <Tab title="Day 5-7">
                <ExtendedWeatherForecast date={date} />
            </Tab>
            <Tab title="Tutorials">
                <Tutorial uid="weather" />
            </Tab>
        </TabSet>
    )
}
