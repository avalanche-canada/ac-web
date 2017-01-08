import React from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import get from 'lodash/get'
import {createSelector} from 'reselect'
import {List, fromJS} from 'immutable'
import turf from 'turf-helpers'
import distance from 'turf-distance'
import {Course, Provider} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {getResultsSet} from 'reducers/api/getters'
import {HeaderCellOrders} from 'components/table'
import {Helper} from 'components/misc'
import {getLocationAsFeature} from 'selectors/geolocation'
import {getPlace, getPlaceAsFeature} from 'selectors/router'
import {computeSorting} from 'selectors/utils'
import {createSorter, createPagination, createPaginatedEntities} from 'selectors/factories'

const {NONE} = HeaderCellOrders

// Util functions and values...
function normalizeTags(tags) {
    return tags.map(tag => tag.toUpperCase().trim())
}

const transformers = new Map([
    [Course, course => Object.assign(course, {
        tags: normalizeTags(course.tags),
        // DO NOT CHANGE THAT. DATES ARE CONVERTED FINE WITH MOMENT.
        dateStart: moment(course.dateStart).toDate(),
        dateEnd: moment(course.dateEnd).toDate(),
        isFeatured: false,
    })],
    [Provider, provider => Object.assign(provider, {
        tags: normalizeTags(provider.tags),
        isFeatured: provider.isSponsor,
    })],
])
function resetDistance(entity) {
    return Object.assign(entity, {
        distance: null
    })
}
function updateDistanceFactory(point) {
    return function updateDistance(entity) {
        return Object.assign(entity, {
            distance: Math.max(distance(turf.point(entity.loc), point), 10)
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
function isFeatured(entity) {
    return entity.isFeatured
}

// Filtering
const Filters = new Map([
    ['level', ({level}) => {
        level = level.toUpperCase().trim()

        return props => props.level === level
    }],
    ['tags', ({tags}) => {
        tags = Array.isArray(tags) ? tags : [tags]
        tags =  tags.map(tag => tag.toUpperCase().trim())

        return course => Boolean(course.tags.find(tag => tags.includes(tag)))
    }],
    ['to', ({from, to}) => {
        from = new Date(from)
        to = new Date(to)
        to = to.setDate(to.getDate() + 1)

        return ({dateStart, dateEnd}) => {
            return (dateStart <= to) && (dateEnd >= from)
        }
    }],
])
function getFilters(state, {location}) {
    const {query} = location

    return Object.keys(query).reduce((filters, key) => {
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
    ['provider', provider => provider.name.toLowerCase()],
    ['courseprovider', course => course.provider.name.toLowerCase()],
])

export function table(schema, columns) {
    const key = schema.getKey()
    const transform = transformers.get(schema)

    function getEntitiesResultsSet(state) {
        return getResultsSet(state, schema, {page_size: 1000})
    }

    const getTransformedEntities = createSelector(
        state => getEntitiesForSchema(state, schema),
        entities => entities.map(entity => transform(entity.toJSON()))
    )

    const getEntitiesList = createSelector(
        getTransformedEntities,
        getEntitiesResultsSet,
        (entities, {results}) => {
            const ids = new List(results)

            return ids.map(id => entities.get(String(id)))
        }
    )

    const getFeaturedEntities = createSelector(
        getEntitiesList,
        entities => entities.filter(isFeatured)
    )

    function tagReducer(tags, entity) {
        return entity.tags.reduce((tags, tag) => tags.add(tag), tags)
    }

    const getTags = createSelector(
        getTransformedEntities,
        entities => entities.reduce(tagReducer, new Set())
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

            return null
        }
    )

    const getEntities = createSelector(
        getEntitiesList,
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

    function getSorting(state, props) {
        return computeSorting(props.location.query.sorting)
    }

    const getSortedEntities = createSorter(
        getFilteredEntities,
        getSorting,
        Sorters,
    )

    const getColumns = createSelector(
        getDistanceHelper,
        getSorting,
        (helper, [name, order]) => {

            // Distance helper
            const key = columns.findKey(column => column.name === 'distance')

            columns = columns.update(key, column => ({
                ...column,
                title: helper ? <Helper title={helper}>Distance</Helper> : 'Distance'
            }))

            // Sorting
            columns = columns.map(column => ({
                ...column,
                sorting: column.sorting ? column.name === name ? order : NONE : undefined,
            }))

            return columns
        }
    )

    const getPagination = createPagination(getFilteredEntities)

    const getPaginatedEntities = createPaginatedEntities(
        getSortedEntities,
        getPagination,
    )

    return createSelector(
        getFeaturedEntities,
        getPaginatedEntities,
        getColumns,
        getTags,
        getEntitiesResultsSet,
        getPagination,
        function mapTableStateToProps(featured, rows, columns, tags, result, pagination) {
            let caption = null
            let title = `All ${key}`

            if (result.isLoaded && rows.size === 0) {
                caption = noEntitiesCaptions.get(schema)
            } else if (result.isFetching) {
                caption = `Loading ${key}...`
            }

            if (result.count > 0) {
                title = `${title} (${result.count})`
            }

            return {
                title,
                featured,
                rows,
                columns,
                caption,
                tags,
                pagination,
            }
        }
    )
}
