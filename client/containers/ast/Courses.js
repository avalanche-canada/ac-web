import React, { Component } from 'react'
import PropTypes from 'prop-types'
import addDays from 'date-fns/add_days'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
import Fetch from 'components/fetch'
import * as ast from 'api/requests/ast'

export default class CoursesContainer extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        level: PropTypes.string,
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
        tags: PropTypes.arrayOf(PropTypes.string),
    }
    render() {
        return (
            <Fetch request={ast.courses(PARAMS)}>{this.props.children}</Fetch>
        )
    }
}

// connect(
//     createStructuredSelector({
//         courses(state, props) {
//             const courses = getEntitiesForSchema(state, Course)
//             const filters = Object.keys(props).reduce((filters, key) => {
//                 if (FILTERS.has(key) && props[key]) {
//                     const filter = FILTERS.get(key).call(null, props)
//
//                     filters.push(filter)
//                 }
//
//                 return filters
//             }, [])
//
//             return filters
//                 .reduce((courses, filter) => courses.filter(filter), courses)
//                 .sortBy(sorter)
//         },
//         status(state) {
//             return getResultsSet(state, Course, OPTIONS)
//                 .asStatus(MESSAGES)
//                 .toObject()
//         },
//     }),
//     dispatch => ({
//         didMount() {
//             dispatch(loadCourses(OPTIONS))
//         },
//     })
// )(Universal)

// Utils
const PARAMS = {
    page_size: 1000,
}
function sorter(course) {
    return course.date_start
}
const FILTERS = new Map([
    ['level', ({ level }) => course => course.level === level],
    [
        'tags',
        ({ tags }) => course =>
            tags.size === 0 ? true : course.tags.some(tag => tags.has(tag)),
    ],
    [
        'to',
        ({ from, to }) => course =>
            areRangesOverlapping(
                from,
                addDays(to, 1),
                course.date_start,
                course.date_end
            ),
    ],
])
