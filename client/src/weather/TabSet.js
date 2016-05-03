import React, { PropTypes } from 'react'
import { TabSet, Tab } from '../components/tab'
import SliceZone from './SliceZone'
import FAQ from './FAQ'
import { Date as DateElement } from '../components/misc'
import moment from 'moment'

const TABS = new Map([
	['synopsis', {
		title: 'Synopsis'
	}],
	['day-1', {
		title: 'Day 1'
	}],
	['day-2', {
		title: 'Day 2'
	}],
	['day-3-5', {
		title: 'Day 3-5'
	}],
	['day-6-10', {
		title: 'Day 6-10'
	}],
])

const NAMES = [...TABS.keys()]

function createTabs(forecast) {
    const date = forecast.getDate(`${forecast.type}.date`)

    return NAMES.map(name => {
        const zone = forecast.getSliceZone(`${forecast.type}.${name}`)

        if (zone === null) {
            return null
        }

        let child = <SliceZone date={date} zone={zone} />

        if (name === 'day-1' || name === 'day-2') {
            const day = Number(name.match(/(\d+)/)[0])
            const d = moment(date).add(day, 'd').toDate()

            child = (
                <section>
                    <header>
                        <h4>
                            <DateElement value={d} />
                        </h4>
                    </header>
                    {child}
                </section>
            )
        }

        return (
            <Tab key={name} {...TABS.get(name)}>
                {child}
            </Tab>
        )
    }).filter(tab => tab !== null)
}

export default function WeatherTabSet({ forecast }) {
    const tabs = createTabs(forecast)

	if (tabs.length === 0) {
		return null
	}

	return (
        <TabSet>
            {tabs}
        </TabSet>
    )
}
