import React, {PropTypes, createElement} from 'react'
import moment from 'moment'
import CSSModules from 'react-css-modules'
import {withContext} from 'recompose'
import {TabSet, Tab} from 'components/tab'
import {Text, Html} from 'prismic'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import SliceSet from './tabs/SliceSet'
import Section from './tabs/Section'
import styles from './Forecast.css'

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
	['day3To5', {
        title: 'Day 3-5',
        component: Section,
    }],
	['day6To10', {
        title: 'Day 6-10',
        component: Section,
    }],
])

function Forecast({forecast}) {
    const {type} = forecast
    const {date} = forecast
    const {headline} = forecast
    const isOld = forecast['day-1'] === null

    if (isOld) {
        console.warn('Need to implement support for older weather forecast')
        // {isOld && <Html forecast={forecast} fragment={`${type}.synopsis`} />}
        // <DaySet start={date} forecast={forecast} />
        // <Outlook forecast={forecast} />
    }

	return (
		<section styleName='Container'>
            <h2 styleName='Headline'>{headline}</h2>
            <TabSet>
                {[...TABS].map(([name, {title, component}]) => {
                    const group = forecast[name]
                    const slices = forecast[`${name}More`] || group

                    if (!group && !slices) {
                        return null
                    }

                    const child = <SliceSet slices={slices} />
                    const props = {
                        ...group[0],
                        date,
                    }

                    return (
                        <Tab key={name} title={title}>
                            {createElement(component, props, child)}
                        </Tab>
                    )
                })}
            </TabSet>
		</section>
	)
}

export default CSSModules(Forecast, styles)
