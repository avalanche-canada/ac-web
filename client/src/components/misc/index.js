import {createText} from './Text'
import {createTime} from './Time'

export Ribbon from './Ribbon'

export Sponsor from './Sponsor'

export Avatar from './Avatar'

export Mailto from './Mailto'
export Phone from './Phone'

export Br from './Br'

export Time from './Time'
export const Date = createTime('Date', 'dddd MMMM Do')
export const DateTime = createTime('DateTime', 'dddd MMMM Do, hh:mm')
export const Day = createTime('Day', 'dddd')

export InnerHTML from './InnerHTML'

export ExpandButton from './ExpandButton'
export SortingButton from './SortingButton'

export InteractiveImage from './InteractiveImage'

export Collapse from './Collapse'

export const Loading = createText('Loading', 'Loading...')
// export const Loading = createText('Loading', 'Loading...')
export Muted from './Text'

export Image from './Image'
