import React, {PropTypes} from 'react'
import moment from 'moment'
import Day from './Day'

const sequence = [0, 1, 2, 3]

DaySet.propTypes = {
	start: PropTypes.instanceOf(Date).isRequired,
    forecast: PropTypes.object,
}

export default function DaySet({forecast, start}) {
	const dates = sequence.map(increment => (
		moment(start).add(increment, 'day').toDate()
	))

	return (
		<div>
			{dates.map((date, index) => (
                <Day {...{date, index, forecast, key: index}} />
            ))}
		</div>
	)
}
