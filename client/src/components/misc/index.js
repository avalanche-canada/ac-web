import startOfDay from 'date-fns/start_of_day'
import parse from 'date-fns/parse'
import {DATE, DATETIME, TIME} from '/utils/date'
import {createTime} from './Time'

export Ribbon from './Ribbon'

export Sponsor from './Sponsor'

export Avatar from './Avatar'

export Mailto from './Mailto'
export Phone from './Phone'

export Br from './Br'

export P from './P'

export SPAW from './SPAW'

export GoBack from './GoBack'

function dateTimeFormatGetter(date) {
    date = parse(date)

    if (startOfDay(date).getTime() === date.getTime()) {
        return DATE
    }

    return DATETIME
}

export {Relative} from './Time'
export const Time = createTime('Time', TIME)
export const DateTime = createTime('DateTime', dateTimeFormatGetter)
export const Day = createTime('Day', 'dddd')
export const DateElement = createTime('Date', DATE)

export InnerHTML from './InnerHTML'

export Collapse from './Collapse'

export {Muted, Loading, Error, Warning, Helper} from './Text'

export Image from './Image'

export Backdrop from './Backdrop'

export DayPicker from './DayPicker'
export {DateUtils} from 'react-day-picker'

export Ratio from './Ratio'
export ElementResize from './ElementResize'

export Delay from './Delay'

export Status from './Status'

export ArchiveWarning from './ArchiveWarning'
