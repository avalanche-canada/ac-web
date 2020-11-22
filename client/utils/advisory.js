// TODO: Trying te remove the need for that function
import bboxPolygon from '@turf/bbox-polygon'
import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

export function title({ region, report, hotZone }) {
    const name = hotZone?.name || report?.data?.region || region

    return report
        ? name
        : `No ${name} Avalanche Advisory is currently available`
}

export function geometry({ bbox }) {
    return bboxPolygon(bbox)
}

export function shareUrl({ uid, data }) {
    return document.location.origin + path(data.region, uid)
}

export function isValid({ dateOfIssue, validUntil }) {
    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
}

// Utils
function path(region, uid) {
    return `/advisories/${region}/${uid}`
}
