// TODO: Trying te remove the need for that function
import bboxPolygon from '@turf/bbox-polygon'

export function geometry({ bbox }) {
    return bboxPolygon(bbox)
}
