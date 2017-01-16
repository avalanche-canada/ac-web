import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import {TabSet, Tab} from 'components/tab'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import Day3to4 from './tabs/Day3to4'
import Day5to7 from './tabs/Day5to7'
import SliceSet from './tabs/SliceSet'
import styles from './Forecast.css'
import Tutorial from 'containers/WeatherTutorial'
import Legacy from './legacy'

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
}

const TABS = new Map([
	['synopsis', {
        title: 'Synopsis',
        component: Synopsis,
    }],
	['day1', {
        title: 'Day 1',
        component: Day1,
    }],
	['day2', {
        title: 'Day 2',
        component: Day2,
    }],
	['day3To4', {
        title: 'Day 3-4',
        component: Day3to4,
    }],
	['day5To7', {
        title: 'Day 5-7',
        component: Day5to7,
    }],
])

function isLegacy({synopsis}) {
    return !Array.isArray(synopsis)
}

function Forecast({forecast}) {
    const {date, headline} = forecast
    let children = null

    if (isLegacy(forecast)) {
        children = <Legacy forecast={forecast} />
    } else {
        children = (
            <TabSet>
                {Array.from(TABS).map(([name, {title, component}]) => {
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
