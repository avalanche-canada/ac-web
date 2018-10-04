import React, { Component } from 'react'
import PropTypes from 'prop-types'
import addDays from 'date-fns/add_days'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import isAfter from 'date-fns/is_after'
import * as ast from 'api/requests/ast'

export default class CoursesContainer extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        level: PropTypes.string,
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
        tags: PropTypes.instanceOf(Set),
    }
    children = ({ data, loading }) => {
        const props = { loading }
        let results = data?.results

        if (Array.isArray(results)) {
            const now = new Date()

            results = results.filter(course => isAfter(course.date_end, now))

            props.courses = getFilters(this.props)
                .reduce(filterReducer, results)
                .sort(sorter)
        }

        return this.props.children(props)
    }
    render() {
        return (
            <Fetch cache={CACHE} request={ast.courses(PARAMS)}>
                {this.children}
            </Fetch>
        )
    }
}

const CACHE = new Memory()

// Utils
const PARAMS = {
    page_size: 1000,
}
function sorter({ date_start, date_end }) {
    return date_start - date_end
}
const FILTERS = new Map([
    ['level', ({ level }) => course => course.level === level],
    [
        'tags',
        ({ tags = new Set() }) => course =>
            tags.size === 0 ? true : course.tags.some(tag => tags.has(tag)),
    ],
    [
        'to',
        ({ from, to }) => ({ date_start, date_end }) =>
            areRangesOverlapping(from, addDays(to, 1), date_start, date_end),
    ],
])
function getFilters(props) {
    return Object.entries(props).reduce((filters, [key, value]) => {
        if (value && FILTERS.has(key)) {
            const filter = FILTERS.get(key).call(null, props)

            filters.push(filter)
        }

        return filters
    }, [])
}
function filterReducer(courses, filter) {
    return courses.filter(filter)
}
