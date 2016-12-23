import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

export function isHotZoneReportValid({dateOfIssue, validUntil}) {
    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
}
