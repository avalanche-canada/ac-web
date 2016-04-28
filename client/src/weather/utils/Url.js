import moment from 'moment'
import padstart from 'lodash.padstart'

export const DOMAIN = 'http://msc.avalanche.ca'

const resolutions = [{
	suffix: 'small',
	width: 500,
}, {
	suffix: 'medium',
	width: 1000,
}, {
	suffix: 'large',
	width: 1500,
}]

export function formatLoop({type, date, run, hour}) {
	hour = padstart(String(hour), 3, '0')
	run = padstart(String(run), 2, '0')
	date = moment(date).format('YYYYMMDD')

	return `${DOMAIN}/loops/images/${type}_${date}${run}_${hour}HR.jpg`
}

export function asSrcSet(url) {
	function asSet({suffix, width}) {
		return `${url.replace('.jpg', `-${suffix}.jpg`)} ${width}w`
	}

	return resolutions.map(asSet).join(', ')
}
