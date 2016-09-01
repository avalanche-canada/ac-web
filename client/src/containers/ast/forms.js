import React, {Component} from 'react'
import {compose, lifecycle, withProps, withHandlers, withState, setDisplayName} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import DayPicker, {DateUtils} from 'react-day-picker'
import moment from 'moment'
import {Form, Legend, Control, ControlSet} from 'components/form'
import {DropdownFromOptions, Input} from 'components/controls'
import {Calendar, Place} from 'components/icons'
import Callout, {BOTTOM} from 'components/callout'
import {Overlay} from 'react-overlays'
import {locate} from 'actions/geolocation'
import {findPlaces} from 'mapbox/api'
import {formatAsDay, parseFromDay} from 'utils/date'
import 'react-day-picker/lib/style.css'

const {isArray} = Array
function asSetParams(value) {
    return new Set(isArray(value) ? value : [value])
}
const STYLE = {
    margin: 'auto Course'
}
const courseOptions = new Map([
    ['AST1', 'AST 1'],
    ['AST1+', 'AST 1 + MAT'],
    ['AST2', 'AST 2'],
    ['CRS', 'Companion Rescue (CRS)'],
    ['MAT', 'Managing Avalanche Terrain (MAT)'],
])
const tagOptions = new Map([
    ['ski', 'Ski'],
    ['sled', 'Sled'],
    ['youth', 'Youth'],
])

function replace(name, value, {router, location}) {
    router.replace({
        ...location,
        query: {
            ...location.query,
            [name]: value,
        }
    })
}

function getDateRange({from, to}) {
    return {
        from: from ? parseFromDay(from) : null,
        to: to ? parseFromDay(to) : null,
    }
}



@withRouter
@connect(null, {locate})
export default class CoursesForm extends Component {
    static STYLE = {
        margin: 'auto Course'
    }
    state = {

    }
    constructor(props) {
        super(props)

    }
    handleCourseChange = course => {
        this.replaceQuery({
            course: course || undefined
        })
    }
    handleTagsChange = tags => {
        this.replaceQuery({
            tags: tags.size > 0 ? [...tags] : undefined
        })
    }
    handleLocationChange = event => {
        const {value} = event.target

        if (value === '') {
            return
        }

        findPlaces(value)
        .then(response => response.data.features)
        .then(::console.warn)
        // replace('point', [...tags], props)
    }
    handleLocationSelect = event => {
        // replace('point', '0 0', props)
    }
    selectedDays = day => {
        const {query} = this.props.location
        const range = getDateRange(query)

        return DateUtils.isDayInRange(day, range)
    }
    handleDayClick = (event, day) => {
        const {query} = this.props.location
        const range = getDateRange(query)
        const {from, to} = DateUtils.addDayToRange(day, range)

        this.replaceQuery({
            from: from ? formatAsDay(from) : undefined,
            to: to ? formatAsDay(to) : undefined,
        })
    }
    handleDateRangeReset = event => {
        this.replaceQuery({
            from: undefined,
            to: undefined,
        })
    }
    replaceQuery(query) {
        const {router, location} = this.props

        router.replace({
            ...location,
            query: {
                ...location.query,
                ...query,
            }
        })
    }
    componentDidMount() {
        this.props.locate()
    }
    componentWillReceiveProps({location, point}) {
        if (location.key === this.props.location.key) {
            return
        }
    }
    render() {
        const {query} = this.props.location
        const {course} = query
        const tags = asSetParams(query.tags)

        return (
            <Form style={STYLE}>
                <Legend>Find a course</Legend>
                <ControlSet horizontal>
                    <Control>
                        <DropdownFromOptions onChange={this.handleCourseChange} value={course} placeholder='Course' options={courseOptions} />
                    </Control>
                    <Control icon={<Calendar />}>
                        <Overlay show={true} placement='Bottom' shouldUpdatePosition >
                            <Callout placement={BOTTOM}>
                                <DayPicker selectedDays={this.selectedDays} numberOfMonths={2} onDayClick={this.handleDayClick} />
                            </Callout>
                        </Overlay>
                    </Control>
                    <Control>
                        <DropdownFromOptions multiple onChange={this.handleTagsChange} value={tags} placeholder='Filter by' options={tagOptions} />
                    </Control>
                    <Control icon={<Place />}>
                        <Input placeholder='Location' onChange={this.handleLocationChange} />
                    </Control>
                </ControlSet>
            </Form>
        )
    }
}


// function CoursesForm({
//     onCourseChange,
//     onTypeChange,
//     onLocationChange,
//     onLocationSelect,
//     selectedDays,
//     onDayClick,
//     course,
//     tags,
// }) {
//     return (
//         <Form style={STYLE}>
//             <Legend>Find a course</Legend>
//             <ControlSet horizontal>
//                 <Control>
//                     <DropdownFromOptions onChange={onCourseChange} value={course} placeholder='Course' options={courseOptions} />
//                 </Control>
//                 <Control icon={<Calendar />}>
//                     <Overlay show={true} placement='Bottom' shouldUpdatePosition >
//                         <Callout placement={BOTTOM}>
//                             <DayPicker selectedDays={selectedDays} numberOfMonths={2} onDayClick={onDayClick} />
//                         </Callout>
//                     </Overlay>
//                 </Control>
//                 <Control>
//                     <DropdownFromOptions multiple onChange={onTypeChange} value={tags} placeholder='Filter by' options={tagOptions} />
//                 </Control>
//                 <Control icon={<Place />}>
//                     <Input placeholder='Location' onChange={onLocationChange} />
//                 </Control>
//             </ControlSet>
//         </Form>
//     )
// }
//
// export const Courses = compose(
//     withRouter,
//     connect(null, {
//         locate,
//     }),
//     withState('showCalendar', 'setShowCalendar', false),
//     withHandlers({
//         onCourseChange: props => course => {
//             replace('course', course || undefined, props)
//         },
//         onTypeChange: props => tags => {
//             let value
//
//             if (tags.size > 0) {
//                 value = [...tags]
//             }
//
//             replace('tags', value, props)
//         },
//         onLocationChange: props => event => {
//             const {value} = event.target
//
//             if (value === '') {
//                 return
//             }
//
//             findPlaces(value)
//             .then(response => response.data.features)
//             .then(::console.warn)
//             // replace('point', [...tags], props)
//         },
//         onLocationSelect: props => event => {
//             replace('point', '0 0', props)
//         },
//         selectedDays: props => day => {
//             const range = getDateRange(props.location.query)
//
//             return DateUtils.isDayInRange(day, range)
//         },
//         onDayClick: props => (event, day) => {
//             const {router, location} = props
//             const {query} = location
//             const range = getDateRange(query)
//             const {from, to} = DateUtils.addDayToRange(day, range)
//
//             router.replace({
//                 ...location,
//                 query: {
//                     ...query,
//                     from: from ? formatAsDay(from) : undefined,
//                     to: to ? formatAsDay(to) : undefined,
//                 }
//             })
//         },
//         onDateRangeReset: props => event => {
//             const {router, location} = props
//
//             router.replace({
//                 ...location,
//                 query: {
//                     ...location.query,
//                     from: undefined,
//                     to: undefined,
//                 }
//             })
//         },
//     }),
//     withProps(({location}) => {
//         const {tags, course} = location.query
//
//         return {
//             tags: asSetParams(tags),
//             course,
//         }
//     }),
//     lifecycle({
//         componentDidMount() {
//             this.props.locate()
//         },
//         componentWillReceiveProps({location, point}) {
//             if (location.key === this.props.location.key) {
//                 return
//             }
//
//
//         },
//     }),
// )(CoursesForm)
