import React, { PropTypes } from 'react'
import { TabSet, Tab } from '../components/tab'
import { getDocument } from '../prismic'
import Loop from './Loop'
import Image from './Image'

const TABS = new Map([
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

function WeatherTabSet({ document }) {
	const tabs = NAMES.map(name => {
		const zone = document.get(`weather-forecast.${name}`)

		if (zone === null) {
			return null
		}

		const slices = zone.value
		const tab = TABS.get(name)

		return (
			<Tab key={name} name={name} title={tab.title}>
				{slices.map(slice => {
					switch (slice.sliceType) {
						case 'text':
							const html = { __html: slice.asHtml() }

							return <div dangerouslySetInnerHTML={html} />
						case 'loop':
							const [loop] = slice.value.toArray()
							const [type, run] = loop.getText('type').split('@')
							const props = {
								type,
								date: loop.getDate('date'),
								run: Number(run)
							}

							return <Loop {...props} />
						case 'image':
							const [image] = slice.value.toArray()
							const { url } = image.getImage('image')

							return <Image src={url} openNewTab />
						}
				})}

			</Tab>
		)
	}).filter(tab => !!tab)

	if (tabs.length === 0) {
		return null
	}

	return <TabSet>{tabs}</TabSet>
}

export default getDocument(WeatherTabSet)
