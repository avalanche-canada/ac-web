import bboxPolygon from '@turf/bbox-polygon'
import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import { HotZoneReport as Schema } from 'api/schemas'

export function title({ report, status, hotZone }) {
    const name = hotZone ? hotZone.get('name') : null

    return status.isLoaded
        ? report ? name : `No ${name} report is currently available`
        : name || 'Loading...'
}

export function geometry(hotZone) {
    const bbox = hotZone.get('bbox').toArray()

    return bboxPolygon(bbox)
}

export function shareUrl({ uid, data }) {
    return `${document.location.origin}/${Schema.key}/${data.region}/${uid}`
}

export function isValid({ dateOfIssue, validUntil }) {
    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
}
