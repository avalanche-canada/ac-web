import isWithinRange from 'date-fns/is_within_range'

export function isHotZoneReportValid({dateOfIssue, validUntil}) {
    return isWithinRange(new Date(), dateOfIssue, validUntil)
}
