import React from 'react'
import { Link } from 'react-router-dom'
import { createSelector } from 'reselect'
import Immutable from 'immutable'
import turf from '@turf/helpers'
import distance from '@turf/distance'
import { Course, Provider } from '~/api/schemas'
import { getEntitiesForSchema } from '~/getters/entities'
import { getResultsSet } from '~/getters/api'
import { Helper } from '~/components/misc'
import { getLocationAsFeature } from '~/selectors/geolocation'
import { getPlace, getPlaceAsFeature } from '~/selectors/router'
import { computeSorting } from '~/selectors/utils'
import * as Factories from '~/selectors/factories'
import { NONE } from '~/constants/sortings'
import { parse } from '~/utils/search'
import addDays from 'date-fns/add_days'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'

// TODO: Reuse functions from selectors utils & factories

// TODO: Could be moved to a utils module
function normalize(string) {
    return string.toUpperCase().trim()
}

function resetDistance(entity) {
    return Object.assign(entity, {
        distance: null,
    })
}

function updateDistanceFactory(point) {
    return function updateDistance(entity) {
        return Object.assign(entity, {
            distance: Math.max(distance(turf.point(entity.loc), point), 10),
        })
    }
}

const noEntitiesCaptions = new Map([
    [
        Course,
        <div>
            No courses match your criteria, consider finding a provider on the{' '}
            <Link to="/training/providers">providers page</Link> to contact
            directly.
        </div>,
    ],
    [
        Provider,
        <div>
            No providers match your criteria, consider finding a course on the{' '}
            <Link to="/training/courses">courses page</Link>
            .
        </div>,
    ],
])

function isFeatured(entity) {
    return entity.isFeatured === true
}

// Filtering
function filterByLevel({ level }) {
    level = normalize(level)

    return entity => entity.level === level
}

function filterByTags({ tags }) {
    tags = Array.isArray(tags) ? tags : [tags]
    tags = new Set(tags.map(normalize))

    return course => Boolean(course.tags.find(tag => tags.has(tag)))
}

function filterByRange({ from, to }) {
    from = new Date(from)
    to = addDays(new Date(to), 1)

    return ({ dateStart, dateEnd }) =>
        areRangesOverlapping(from, to, dateStart, dateEnd)
}

const getFilters = Factories.createGetFilters(
    new Map([
        ['level', filterByLevel],
        ['tags', filterByTags],
        ['to', filterByRange],
    ])
)

// Sorting
const Sorters = new Map([
    ['dates', course => course.dateStart],
    ['distance', course => course.distance],
    ['provider', provider => provider.name.toLowerCase()],
    ['courseprovider', course => course.provider.name.toLowerCase()],
])

export function table(schema, columns) {
    const { key } = schema

    function getEntitiesResultsSet(state) {
        return getResultsSet(state, schema, { page_size: 1000 })
    }

    const getEntitiesList = createSelector(
        state => getEntitiesForSchema(state, schema),
        getEntitiesResultsSet,
        (entities, result) => {
            const ids = new Immutable.List(result.ids)

            return ids.map(id => entities.get(String(id)).toJSON())
        }
    )

    const getFeaturedEntities = createSelector(getEntitiesList, entities =>
        entities.filter(isFeatured)
    )

    function tagReducer(tags, entity) {
        return entity.tags.reduce((tags, tag) => tags.add(tag), tags)
    }

    const getTags = createSelector(getEntitiesList, entities =>
        entities.reduce(tagReducer, new Set())
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

    const getFilteredEntities = Factories.createFilteredEntities(
        getEntities,
        getFilters
    )

    function getSorting(state, { location }) {
        const { sorting } = parse(location.search)

        return computeSorting(sorting)
    }

    const getSortedEntities = Factories.createSorter(
        getFilteredEntities,
        getSorting,
        Sorters
    )

    const getColumns = createSelector(
        getDistanceHelper,
        getSorting,
        (helper, [name, order]) => {
            // Distance helper
            const key = columns.findKey(column => column.name === 'distance')

            columns = columns.update(key, column => ({
                ...column,
                title: helper
                    ? <Helper title={helper}>Distance</Helper>
                    : 'Distance',
            }))

            // Sorting
            columns = columns.map(column => ({
                ...column,
                sorting: column.sorting
                    ? column.name === name ? order : NONE
                    : undefined,
            }))

            return columns
        }
    )

    const getPagination = Factories.createPagination(getFilteredEntities)

    const getPaginatedEntities = Factories.createPaginatedEntities(
        getSortedEntities,
        getPagination
    )

    return createSelector(
        getFeaturedEntities,
        getPaginatedEntities,
        getColumns,
        getTags,
        getEntitiesResultsSet,
        getPagination,
        function mapTableStateToProps(
            featured,
            rows,
            columns,
            tags,
            result,
            pagination
        ) {
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
