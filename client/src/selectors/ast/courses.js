import React from 'react'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import turf from 'turf-helpers'
import distance from 'turf-distance'
import {DateUtils} from 'react-day-picker'
import {Provider, Course} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {Phone, Mailto, DateElement} from 'components/misc'
import {getGeolocation} from 'reducers/geolocation'
import {formatAsDay, parseFromDay} from 'utils/date'

const {keys} = Object
const COLUMNS = [{
        title: 'Dates',
        property({dateStart, dateEnd}) {
            const start = new Date(dateStart)
            const end = new Date(dateEnd)

            return (
                <div>
                    <DateElement value={start} /> <em>to</em> <DateElement value={end} />
                </div>
            )
        }
    }, {
        title: 'Course',
        property: 'level',
    }, {
        title: 'Description',
        property: 'description',
    }, {
        title: 'Distance',
        property({distance}) {
            if (typeof distance === 'number') {
                return `${Math.ceil(distance)} km.`
            }

            return 'N/A'
        },
    }, {
        title: 'Location',
        property: 'locDescription',
    }, {
        title: 'Tags',
        property: 'tags',
    }
]

const RESULTS = {
    ids: new Set(),
    isLoading: false,
    isLoaded: false,
    isError: false,
}

function asControlled({provider}) {
    const {name, email, phone, website, prim_contact, mailing_addr} = provider

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
        Address: mailing_addr,
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
    (courses, ids) => ids.map(id => courses.get(id)).toJSON()
)

function getPlace() {

}

const getPointForDistance = createSelector(
    getPosition,
    getPlace,
    (position, place) => {
        if (place) {
            return place
        }

        return position
    }
)

const Filters = new Map([
    ['course', ({course}) => ({level}) => level === course],
    ['tags', ({tags}) => course => Boolean(course.tags.find(tag => tags.includes(tag)))],
    ['to', ({from, to}) => ({dateStart, dateEnd}) => {
        return true

        const range = {
            from: new Date(dateStart),
            to: new Date(dateEnd),
        }

        return DateUtils.isDayInRange(parseFromDay(from), range)
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

const getCourses = createSelector(
    getRawCourses,
    getPointForDistance,
    (courses, point) => {
        if (!point) {
            return courses
        }

        return courses.map(course => {
            course.distance = distance(turf.point(course.loc), point)

            return course
        })
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

function isSponsor({provider}) {
    return provider.is_sponsor
}
function isNotSponsor({provider}) {
    return !provider.is_sponsor
}

export default createSelector(
    getCoursesResultSet,
    getFilteredCourses,
    function mapStateToProps(result, courses) {
        return {
            ...result,
            title: 'All courses',
            legend: 'Find a course',
            columns: COLUMNS,
            featured: courses.filter(isSponsor),
            rows: courses.filter(isNotSponsor),
            asControlled,
        }
    }
)
