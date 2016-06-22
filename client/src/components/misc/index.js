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

export ExpandButton from './ExpandButton'
export SortingButton from './SortingButton'

export InteractiveImage from './InteractiveImage'

export Collapse from './Collapse'

export Muted from './Text'
export Loading from './Text'

export Image from './Image'
