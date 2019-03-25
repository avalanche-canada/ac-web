import React from 'react'
import PropTypes from 'prop-types'
import addDays from 'date-fns/add_days'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import isAfter from 'date-fns/is_after'
import * as ast from 'api/requests/ast'

CoursesContainer.propTypes = {
    children: PropTypes.func.isRequired,
    level: PropTypes.string,
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
    tags: PropTypes.instanceOf(Set),
}

export default function CoursesContainer({ children, ...params }) {
    return (
        <Fetch cache={CACHE} request={ast.courses()}>
            {({ data, loading }) => {
                const props = { loading }
                let results = data?.results

                if (Array.isArray(results)) {
                    const now = new Date()

                    results = results.filter(course =>
                        isAfter(course.date_end, now)
                    )

                    props.courses = getFilters(params)
                        .reduce(filterReducer, results)
                        .sort(sorter)
                }

                return children(props)
            }}
        </Fetch>
    )
}

// Utils and constants
const CACHE = new Memory()
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
