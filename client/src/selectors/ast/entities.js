import React from 'react'
import {Link} from 'react-router'
import get from 'lodash/get'
import {createSelector} from 'reselect'
import {List, fromJS} from 'immutable'
import turf from 'turf-helpers'
import distance from 'turf-distance'
import {Course, Provider} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import {HeaderCellOrders} from 'components/table'
import {Helper} from 'components/misc'
import {getLocationAsFeature} from 'selectors/geolocation'
import {getPlace, getPlaceAsFeature} from 'selectors/router'

const {ASC, DESC, NONE} = HeaderCellOrders
const {keys, assign} = Object
const {isArray} = Array

// Util functions and values...
function normalize(entity) {
    return assign(entity, {
        tags: entity.tags.map(tag => tag.toUpperCase().trim())
    })
}
function resetDistance(entity) {
    return assign(entity, {
        distance: null
    })
}
function updateDistanceFactory(point) {
    return function updateDistance(entity) {
        return assign(entity, {
            distance: distance(turf.point(entity.loc), point)
        })
    }
}
const noEntitiesCaptions = new Map([
    [Course, (
        <div>
            No courses match your criteria, consider finding a provider on the <Link to='/training/providers'>providers page</Link> to contact directly.
        </div>
    )],
    [Provider, (
        <div>
            No providers match your criteria, consider finding a course on the <Link to='/training/courses'>courses page</Link>.
        </div>
    )],
])

// Filtering
const Filters = new Map([
    ['course', ({course}) => {
        course = course.toUpperCase().trim()

        return ({level}) => level === course
    }],
    ['tags', ({tags}) => {
        tags = isArray(tags) ? tags : [tags]
        tags =  tags.map(tag => tag.toUpperCase().trim())

        return course => Boolean(course.tags.find(tag => tags.includes(tag)))
    }],
    ['to', ({from, to}) => {
        from = new Date(from)
        to = new Date(to)
        to = to.setDate(to.getDate() + 1)

        return ({dateStart, dateEnd}) => {
            // TODO: Remove if we convert dates earlier
            const start = new Date(dateStart)
            let end = new Date(dateEnd)
            end = end.setDate(end.getDate() - 1)

            return (start <= to) && (end >= from)
        }
    }],
])
function getFilters(state, {location}) {
    const {query} = location

    return keys(query).reduce((filters, key) => {
        if (Filters.has(key)) {
            filters.push(Filters.get(key)(query))
        }

        return filters
    }, [])
}
function filterReducer(entities, filter) {
    return entities.filter(filter)
}

// Sorting
const Sorters = new Map([
    ['dates', course => course.dateStart],
    ['distance', course => course.distance],
])
function getSorting(state, {location}) {
    return location.query.sorting || []
}

export function table(schema, columns) {
    const key = schema.getKey()

    const getIds = createSelector(
        (state, {params}) => getResultsSet(state, schema, params) || RESULT,
        ({ids = new Set()}) => List.of(...ids).map(String)
    )

    const getRawEntities = createSelector(
        state => getEntitiesForSchema(state, schema),
        getIds,
        (entities, ids) => ids.map(id => normalize(entities.get(id).toJSON()))
    )

    const getTags = createSelector(
        getRawEntities,
        entities => new Set(entities.reduce((tags, entity) => tags.concat(entity.tags), []))
    )

    const getDistanceHelper = createSelector(
        getLocationAsFeature,
        getPlace,
        (position, place) => {
            if (place) {
                return `Straight line between ${place.text} and the ${key}.`
            } else if (position) {
                return `Straight line between your current location and the ${key}.`
            }
        }
    )

    const getEntities = createSelector(
        getRawEntities,
        getLocationAsFeature,
        getPlaceAsFeature,
        (entities, location, place) => {
            const point = place || location
            const updater = point ? updateDistanceFactory(point) : resetDistance

            return entities.map(updater)
        }
    )

    const getFilteredEntities = createSelector(
        getEntities,
        getFilters,
        (entities, filters) => filters.reduce(filterReducer, entities)
    )

    const getSortedEntities = createSelector(
        getFilteredEntities,
        getSorting,
        (entities, [name, order]) => {
            if (!Sorters.has(name)) {
                return entities
            }

            const sorter = Sorters.get(name)

            switch (order) {
                case ASC:
                    return entities.sortBy(sorter)
                case DESC:
                    return entities.sortBy(sorter).reverse()
                case NONE:
                    return entities
                default:
                    return entities

            }

        }
    )

    const getColumns = createSelector(
        getDistanceHelper,
        getSorting,
        (helper, sorting) => {
            if (helper) {
                const key = columns.findKey(column => column.name === 'distance')

                columns = columns.update(key, column => ({
                    ...column,
                    title() {
                        return (
                            <Helper title={helper}>
                                Distance
                            </Helper>
                        )
                    }
                }))
            }

            if (sorting) {
                const [name, order] = sorting
                const key = columns.findKey(column => column.name === name)

                columns = columns.update(key, column => ({
                    ...column,
                    sorting: order,
                }))
            }

            return columns
        }
    )

    return createSelector(
        getSortedEntities,
        getColumns,
        getTags,
        (state, {params}) => getResultsSet(state, schema, params) || RESULT,
        function mapTableStateToProps(entities, columns, tags, result) {
            let caption = null

            if (result.isLoaded && entities.size === 0) {
                caption = noEntitiesCaptions.get(schema)
            } else if (result.isFetching) {
                caption = `Loading ${key}...`
            }

            return {
                title: `All ${key}`,
                columns,
                entities,
                caption,
                tags,
            }
        }
    )
}
