import React from 'react'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import {Provider, Course} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {Phone, Mailto, DateElement} from 'components/misc'
import {getGeolocation} from 'reducers/geolocation'

const typeOptions = new Map([
    ['ski', 'Ski'],
    ['sled', 'Sled'],
    ['youth', 'Youth'],
    ['companion-rescue', 'Companion rescue'],
])

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
        title: 'Level',
        property: 'level',
    }, {
        title: 'Description',
        property: 'description',
    }, {
        title: 'Distance',
        property: 'distance',
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

function getCoursesResultSet(state, {location}) {
    const {query} = location

    return getResultsSet(state, Course, query) || RESULTS
}

const getCourseIds = createSelector(
    getCoursesResultSet,
    ({ids = new Set()}) => List.of(...ids).map(String)
)

const getCourses = createSelector(
    getCourseEntities,
    getCourseIds,
    (courses, ids) => ids.map(id => courses.get(id)).toJSON()
)

export default createSelector(
    getCoursesResultSet,
    getCourses,
    getGeolocation,
    function mapStateToProps(result, courses, position) {
        let point = null

        if (position && position.coords) {
            const {longitude, latitude} = position.coords

            point = [longitude, latitude]
        }

        return {
            ...result,
            title: 'All courses',
            legend: 'Find a course',
            columns: COLUMNS,
            rows: courses,
            asControlled,
        }
    }
)
