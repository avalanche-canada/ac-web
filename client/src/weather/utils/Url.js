import moment from 'moment'
import padstart from 'lodash.padstart'

const DOMAIN = 'http://msc.avalanche.ca'
const PATH = 'loops/images'

function formatDate(value = new Date()) {
	return moment(value).format('YYYYMMDDHH')
}
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

export function format({type, date, hour}) {
	const run = padstart(String(hour), 3, '0')

	return `${DOMAIN}/${PATH}/${type}_${formatDate(date)}_${run}HR.jpg`
}

export function asSrcSet(url) {
	function asSet({suffix, width}) {
		return `${url.replace('.jpg', `-${suffix}.jpg`)} ${width}w`
	}

	return resolutions.map(asSet).join(', ')
}
