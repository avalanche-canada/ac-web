import moment from 'moment'
import padstart from 'lodash.padstart'

const DOMAIN = 'http://msc.avalanche.ca'
const PATH = 'loops/images'

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

export function format({type, date, run, hour}) {
	hour = padstart(String(hour), 3, '0')
	run = padstart(String(run), 2, '0')
	date = moment(date).format('YYYYMMDD')

	return `${DOMAIN}/${PATH}/${type}_${date}${run}_${hour}HR.jpg`
}

export function asSrcSet(url) {
	function asSet({suffix, width}) {
		return `${url.replace('.jpg', `-${suffix}.jpg`)} ${width}w`
	}

	return resolutions.map(asSet).join(', ')
}
