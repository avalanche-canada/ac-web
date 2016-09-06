import React from 'react'
import {createSelector} from 'reselect'
import {List, fromJS} from 'immutable'
import turf from 'turf-helpers'
import distance from 'turf-distance'
import {Course} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {Phone, Mailto, DateElement, Helper} from 'components/misc'
import {HeaderCellOrders} from 'components/table'
import {getGeolocation} from 'reducers/geolocation'
import get from 'lodash/get'

const {ASC, DESC, NONE} = HeaderCellOrders
const {keys} = Object
const COLUMNS = new List([{
        name: 'dates',
        title: 'Dates',
        property({dateStart, dateEnd}) {
            const start = new Date(dateStart)
            const end = new Date(dateEnd)

            return (
                <div>
                    <DateElement value={start} /> <em>to</em> <DateElement value={end} />
                </div>
            )
        },
        sorting: NONE,
    }, {
        title: 'Course',
        property: 'level',
    }, {
        title: 'Description',
        property: 'description',
    }, {
        name: 'distance',
        title: 'Distance',
        property({distance}) {
            if (typeof distance === 'number') {
                return `${Math.ceil(distance)} km.`
            }

            return 'N/A'
        },
        sorting: NONE,
    }, {
        title: 'Location',
        property: 'locDescription',
    }, {
        title: 'Tags',
        property: 'tags',
    }
])

const RESULTS = {
    ids: new Set(),
    isLoading: false,
    isLoaded: false,
    isError: false,
}

function asControlled({provider}) {
    const {name, email, phone, website, prim_contact, location} = provider

    return {
        Name: name,
        Contact: prim_contact,
        Website() {
            return (
                <a href={website} target='_blank'>{website}</a>
            )
        },
        Email() {
            return (
                <Mailto email={email} />
            )
        },
        Phone() {
            return (
                <Phone phone={phone} />
            )
        },
        Location: location,
    }
}



function getCourseEntities(state) {
    return getEntitiesForSchema(state, Course)
}

function getCoursesResultSet(state) {
    return getResultsSet(state, Course) || RESULTS
}

const getCourseIds = createSelector(
    getCoursesResultSet,
    ({ids = new Set()}) => List.of(...ids).map(String)
)

const getPosition = createSelector(
    getGeolocation,
    location => {
        if (location && location.coords) {
            const {longitude, latitude} = location.coords

            return turf.point([longitude, latitude])
        }
    }
)

const getRawCourses = createSelector(
    getCourseEntities,
    getCourseIds,
    (courses, ids) => ids.map(id => courses.get(id).toJSON())
)

function getPlaceFromLocationState(state, {location}) {
    return get(location, 'state.place', null)
}

const getFeatureFromLocationState = createSelector(
    getPlaceFromLocationState,
    place => place && turf.point(place.center) || null
)

const getPointForDistance = createSelector(
    getPosition,
    getFeatureFromLocationState,
    (position, place) => place || position
)

const getDistanceHelper = createSelector(
    getPosition,
    getPlaceFromLocationState,
    (position, place) => {
        if (place) {
            return `Straight line between ${place.text} and the course.`
        } else if (position) {
            return 'Straight line between your current location and the course.'
        }
    }
)

const Filters = new Map([
    ['course', ({course}) => ({level}) => level === course],
    ['tags', ({tags}) => course => Boolean(course.tags.find(tag => tags.includes(tag)))],
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

const Sorters = new Map([
    ['dates', course => course.dateStart],
    ['distance', course => course.distance],
])

function resetDistance(course) {
    course.distance = null

    return course
}
function updateDistanceFactory(point) {
    return function updateDistance(course) {
        course.distance = distance(turf.point(course.loc), point)

        return course
    }
}

const getCourses = createSelector(
    getRawCourses,
    getPointForDistance,
    (courses, point) => {
        const updater = point ? updateDistanceFactory(point) : resetDistance

        return courses.map(updater)
    }
)

function filterReducer(courses, filter) {
    return courses.filter(filter)
}

const getFilteredCourses = createSelector(
    getCourses,
    getFilters,
    (courses, filters) => filters.reduce(filterReducer, courses)
)

function getSorting(state, {location}) {
    return location.query.sorting || []
}

const getSortedCourses = createSelector(
    getFilteredCourses,
    getSorting,
    (courses, [name, order]) => {
        if (!Sorters.has(name)) {
            return courses
        }

        const sorter = Sorters.get(name)

        switch (order) {
            case ASC:
                return courses.sortBy(sorter)
            case DESC:
                return courses.sortBy(sorter).reverse()
            case NONE:
                return courses
            default:
                return courses

        }

    }
)

const getColumns = createSelector(
    getDistanceHelper,
    getSorting,
    (helper, sorting) => {
        let columns = COLUMNS

        if (helper) {
            const key = columns.findKey(column => column.name === 'distance')

            columns = columns.update(3, column => ({
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

function isSponsor({provider}) {
    return provider.is_sponsor
}

export const table = createSelector(
    getSortedCourses,
    getCoursesResultSet,
    getColumns,
    function mapTableStateToProps(courses, result, columns) {
        let caption = undefined

        if (result.isLoaded && courses.length === 0) {
            caption = 'No courses found.'
        }

        return {
            ...result,
            title: 'All courses',
            legend: 'Find a course',
            columns,
            featured: courses.filter(isSponsor),
            rows: courses.filterNot(isSponsor),
            caption,
            asControlled,
        }
    }
)

export const form = createSelector(
    getRawCourses,
    function mapFormStateToProps(courses) {
        const tags = new Set(courses.reduce((tags, course) => tags.concat(course.tags), []))

        return {
            tagOptions: new Map([...tags].map(tag => [tag, tag]))
        }
    }
)
