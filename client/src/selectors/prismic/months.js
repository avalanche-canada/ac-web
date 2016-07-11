import moment from 'moment'

export const options = moment.months().reduce((months, month) => (
    months.set(month.toLowerCase(), month)
), new Map([
    [undefined, 'All months']
]))

export default [...options.keys()]
