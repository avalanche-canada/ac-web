import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loadCourses } from 'actions/entities'
import Universal from 'components/Universal'
import { getEntitiesForSchema } from 'getters/entities'
import { getResultsSet } from 'getters/api'
import { Course } from 'api/schemas'
import addDays from 'date-fns/add_days'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'

export default connect(
    createStructuredSelector({
        courses(state, props) {
            const courses = getEntitiesForSchema(state, Course)
            const filters = Object.keys(props).reduce((filters, key) => {
                if (FILTERS.has(key) && props[key]) {
                    const filter = FILTERS.get(key).call(null, props)

                    filters.push(filter)
                }

                return filters
            }, [])

            return filters
                .reduce((courses, filter) => courses.filter(filter), courses)
                .sortBy(sorter)
        },
        status(state) {
            return getResultsSet(state, Course, OPTIONS)
                .asStatus(MESSAGES)
                .toObject()
        },
    }),
    dispatch => ({
        didMount() {
            dispatch(loadCourses(OPTIONS))
        },
    })
)(Universal)

// Utils
const OPTIONS = {
    page_size: 1000,
}
const MESSAGES = {
    isLoading: 'Loading courses...',
    isError: 'An error happened while loading courses.',
}
function sorter(course) {
    return course.get('dateStart')
}
const FILTERS = new Map([
    ['level', ({ level }) => course => course.get('level') === level],
    [
        'tags',
        ({ tags }) => course => course.get('tags').some(tag => tags.has(tag)),
    ],
    [
        'to',
        ({ from, to }) => course =>
            areRangesOverlapping(
                from,
                addDays(to, 1),
                course.get('dateStart'),
                course.get('dateEnd')
            ),
    ],
])
