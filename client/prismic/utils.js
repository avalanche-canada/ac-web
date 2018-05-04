import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import isBefore from 'date-fns/is_before'

export function isHotZoneReportValid({ dateOfIssue, validUntil }) {
    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
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

export function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())))
    }
}
