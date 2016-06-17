import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import {withContext} from 'recompose'
import {TabSet, Tab} from 'components/tab'
import * as tabs from './tabs'
import {Text, Html} from 'prismic'
import styles from './Forecast.css'

Forecast.propTypes = {
    document: PropTypes.object,
}

const TABS = new Map([
	['synopsis', {
        title: 'Synopsis',
        component: tabs.Synopsis,
    }],
	['day-1', {
        title: 'Day 1',
        component: tabs.Day1,
    }],
	['day-2', {
        title: 'Day 2',
        component: tabs.Day2,
    }],
	['day-3-5', {
        title: 'Day 3-5',
        component: tabs.Day3to5,
    }],
	['day-6-10', {
        title: 'Day 6-10',
        component: tabs.Day6to10,
    }],
])

function Forecast({document}) {
    if (!document) {
        return null;
    }

    const {type} = document
    const date = document.getDate(`${type}.date`)
    const headline = document.getText(`${type}.headline`)
    const isOld = document.get(`${type}.day-1`) === null

    if (isOld) {
        console.log('Need to implement support for older weather forecast')
        // {isOld && <Html document={document} fragment={`${type}.synopsis`} />}
        // <DaySet start={date} forecast={document} />
        // <Outlook forecast={document} />
    }

	return (
		<section styleName='Container'>
            <h2 styleName='Headline'>{headline}</h2>
            <TabSet>
                {[...TABS].map(([name, {title, component}]) => {
                    const group = document.getGroup(`${type}.${name}`)
                    const zone = document.getSliceZone(`${type}.${name}-more`)

                    if (!group && !zone) {
                        return null
                    }

                    return (
                        <Tab key={name} title={title}>
                            {createElement(component, {
                                group: group && group.value[0],
                                slices: zone && zone.slices || [],
                                date
                            })}
                        </Tab>
                    )
                })}
            </TabSet>
		</section>
	)
}

export default CSSModules(Forecast, styles)
