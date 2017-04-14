import React, {createElement} from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {TabSet, Tab} from 'components/tab'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3To4 from './tabs/Day3to4'
import Day5To7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import styles from './Forecast.css'
import Tutorial from 'containers/WeatherTutorial'
import Legacy from './legacy'
import TABS, {SYNOPSIS, DAY1, DAY2, DAY3TO4, DAY5TO7} from 'components/weather/tabs'

const TABS_PROPS = new Map([
    [SYNOPSIS, {
        name: 'synopsis',
        title: 'Synopsis',
        component: Synopsis,
    }],
    [DAY1, {
        name: 'day1',
        title: 'Day 1',
        component: Day1,
    }],
    [DAY2, {
        name: 'day2',
        title: 'Day 2',
        component: Day2,
    }],
    [DAY3TO4, {
        name: 'day3To4',
        title: 'Day 3-4',
        component: Day3To4,
    }],
    [DAY5TO7, {
        name: 'day5To7',
        title: 'Day 5-7',
        component: Day5To7,
    }],
])

function isLegacy({synopsis}) {
    return !Array.isArray(synopsis)
}

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.oneOf(TABS)),
}

function Forecast({forecast = {}, tabs = TABS}) {
    const {date, headline} = forecast
    let children = null

    if (isLegacy(forecast)) {
        children = <Legacy forecast={forecast} />
    } else {
        children = (
            <TabSet>
                {tabs.map(id => {
                    const {title, component, name} = TABS_PROPS.get(id)
                    const group = forecast[name]
                    const slices = forecast[`${name}More`] || group

                    if (!group && !slices) {
                        return null
                    }
                    const props = {
                        date
                    }

                    if (group) {
                        Object.assign(props, group[0])
                    }

                    const child = <SliceSet slices={slices} />

                    return (
                        <Tab key={name} title={title}>
                            {createElement(component, props, child)}
                        </Tab>
                    )
                })}
                <Tab title='Tutorials'>
                    <Tutorial uid='weather' />
                </Tab>
            </TabSet>
        )
    }

    return (
        <section styleName='Container'>
            <h2 styleName='Headline'>{headline}</h2>
            {children}
        </section>
    )
}

export default CSSModules(Forecast, styles)
