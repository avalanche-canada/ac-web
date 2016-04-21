import React, { PropTypes } from 'react'
import { TabSet, Tab } from '../components/tab'
import getForecast from './getForecast'
import SliceZone from './SliceZone'
import FAQ from './FAQ'

const TABS = new Map([
	['synopsis', {
		title: 'Synopsis'
	}],
	['content-1-2', {
		title: 'Day 1-2'
	}],
	['content-3-5', {
		title: 'Day 3-5'
	}],
	['content-6-10', {
		title: 'Day 6-10'
	}],
])

const NAMES = [...TABS.keys()]

function createTabs(forecast) {
    return NAMES.map(name => {
		const zone = forecast.get(`weather-forecast.${name}`)

        if (zone === null) {
            return null
        }

		return (
			<Tab key={name} {...TABS.get(name)}>
                <SliceZone zone={zone} />
			</Tab>
		)
	}).filter(tab => tab !== null)
}

function WeatherTabSet({ forecast }) {
	return (
        <TabSet>
            {createTabs(forecast)}
            <Tab name='faq' title='FAQ'>
                <FAQ />
            </Tab>
        </TabSet>
    )
}

export default getForecast(WeatherTabSet)
