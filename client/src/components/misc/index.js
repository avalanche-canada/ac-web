import {createTime} from './Time'

export Ribbon from './Ribbon'

export Sponsor from './Sponsor'

export Avatar from './Avatar'

export Mailto from './Mailto'
export Phone from './Phone'

export Br from './Br'

const now = new Date()

export Time from './Time'
export const DateElement = createTime('Date', function format(value) {
    return value.getFullYear() === now.getFullYear() ? 'dddd MMMM Do' : 'dddd MMMM Do, YYYY'
})
export const DateTime = createTime('DateTime', 'dddd MMMM Do, hh:mm')
export const Day = createTime('Day', 'dddd')

export InnerHTML from './InnerHTML'

export Collapse from './Collapse'

export {Muted, Loading, Error} from './Text'

export Image from './Image'

export Backdrop from './Backdrop'

export DayPicker from './DayPicker'
export {DateUtils} from 'react-day-picker'
