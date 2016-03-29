import React, { PropTypes } from 'react'
import moment from 'moment'
import Day from './Day'

const sequence = [1, 2, 3, 4]

DaySet.propTypes = {
	start: PropTypes.instanceOf(Date).isRequired,
}

function DaySet({ start }) {
	const dates = sequence.map(increment => (
		moment(start).add(increment, 'day').toDate()
	))

	return (
		<div>
			{dates.map((date, index) => <Day {...{date, index, key: index}} />)}
		</div>
	)
}

export default DaySet
