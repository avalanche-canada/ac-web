import Immutable from 'immutable'
import {createSelector} from 'reselect'
import createBbox from '@turf/bbox'
import turf from '@turf/helpers'
import mapbox from 'services/mapbox/map'
import {getActiveFeatures} from 'getters/map'
import {getPrimary, getSecondary} from '/selectors/drawers'
import {getEntities} from 'getters/entities'
import {getDocuments} from 'getters/prismic'
import Parser, {parseLocation} from '/prismic/parser'

const {LngLatBounds} = mapbox

function createLngLatBounds(bbox) {
    if (bbox instanceof LngLatBounds) {
        bbox = [
            bbox.getWest(),
            bbox.getSouth(),
            bbox.getEast(),
            bbox.getNorth(),
        ]
    }

    if (bbox.some(isNaN) || !bbox.every(isFinite)) {
        return null
    }

    let [west, south, east, north] = bbox

    if (north === south) {
        south = south - 0.0025
        north = north + 0.0025
    }

    if (east === west) {
        west = west - 0.0025
        east = east + 0.0025
    }

    return new LngLatBounds([west, south], [east, north])
}

export const computeOffset = createSelector(
    getPrimary,
    getSecondary,
    (primary, secondary) => (assumePrimaryOpen, assumeSecondaryOpen) => {
        let x = 0

        if (assumePrimaryOpen || primary.open) {
            x -= primary.width / 2
        }
        if (assumeSecondaryOpen || secondary.open) {
            x += secondary.width / 2
        }

        return [x, 0]
    }

)

export const computeFitBounds = createSelector(
    computeOffset,
    computeOffset => (feature, assumePrimaryOpen, assumeSecondaryOpen, options = {}) => {
        if (!feature) {
            return null
        }

        let bbox = null

        if (Immutable.Iterable.isIterable(feature)) {
            if (feature.has('bbox')) {
                bbox = feature.get('bbox').toJSON()
            } else if (feature.has('geometry')) {
                const geometry = feature.get('geometry').toJSON()

                bbox = createBbox(turf.feature(geometry))
            } else {
                return null
            }
        } else {
            bbox = createBbox(feature)
        }

        return {
            bbox: createLngLatBounds(bbox),
            options: {
                offset: computeOffset(assumePrimaryOpen, assumeSecondaryOpen),
                padding: 75,
                maxZoom: 12.5,
                ...options,
            }
        }
    }
)

const DocumentPathToSchema = new Map([
    ['toyota-truck-reports', 'toyota-truck-report'],
])

export default createSelector(
    computeOffset,
    getActiveFeatures,
    getEntities,
    getDocuments,
    (computeOffset, activeFeatures, entities, documents) => {
        if (activeFeatures.size === 0) {
            return null
        }

        const bbox = activeFeatures.reduce((bounds, id, schema) => {
            if (typeof schema === 'object' && 'key' in schema) {
                schema = schema.key
            }

            if (DocumentPathToSchema.has(schema)) {
                schema = DocumentPathToSchema.get(schema)
            }

            if (entities.hasIn([schema, id])) {
                const entity = entities.get(schema).get(id)

                if (entity.has('bbox')) {
                    const [west, south, east, north] = entity.get('bbox').toArray()

                    return bounds.extend([[west, south], [east, north]])
                } else if (entity.has('latlng')) {
                    return bounds.extend([
                        Number(entity.getIn(['latlng', 1])),
                        Number(entity.getIn(['latlng', 0])),
                    ])
                } else if (entity.has('longitude') && entity.has('latitude')) {
                    return bounds.extend([
                        entity.get('longitude'),
                        entity.get('latitude'),
                    ])
                }
            } else if (documents.has(schema)) {
                const document = documents.get(schema).find(
                    document => document.uid === id
                )

                if (document) {
                    const {position, locations} = Parser.parse(document)

                    if (locations && locations.length > 0) {
                        const [west, south, east, north] = createBbox(
                            turf.multiPoint(
                                locations.map(parseLocation)
                            )
                        )

                        return bounds.extend([[west, south], [east, north]])
                    } else if (position) {
                        return bounds.extend([position.longitude, position.latitude])
                    }
                }
            }

            return bounds
        }, new LngLatBounds())

        if (bbox.getSouthWest() && bbox.getNorthEast()) {
            return {
                bbox: createLngLatBounds(bbox),
                options: {
                    offset: computeOffset(),
                    padding: 50,
                }
            }
        } else {
            return null
        }
    }
)
