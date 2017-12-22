import bboxPolygon from '@turf/bbox-polygon'
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
