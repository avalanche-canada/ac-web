import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import isBefore from 'date-fns/is_before'
import format from 'date-fns/format'

const StringToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
    [null, false],
])

export function isHotZoneReportValid(report) {
    return isReportWithinRange(report, new Date())
}

export function isReportWithinRange({ dateOfIssue, validUntil }, date) {
    return isWithinRange(date, startOfDay(dateOfIssue), endOfDay(validUntil))
}

export function isSpecialInformationValid(report) {
    const { dateOfIssue, validUntil } = report.data

    if (!validUntil) {
        return isBefore(startOfDay(dateOfIssue), new Date())
    }

    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
}

export function boolean(string) {
    return StringToBoolean.get(string)
}

export function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())))
    }
}

export function formatDate(date) {
    return format(date, 'YYYY-MM-DD')
}
