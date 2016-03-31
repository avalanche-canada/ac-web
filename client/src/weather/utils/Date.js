import moment from 'moment'

const MASK = 'dddd MMMM Do'

export function format(date, mask = MASK) {
	return moment(date).format(mask)
}
