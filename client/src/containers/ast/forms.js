import React, {Component} from 'react'
import {compose, lifecycle, withProps, withHandlers, withState, setDisplayName} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Form, Legend, Control, ControlSet} from 'components/form'
import {DropdownFromOptions, Input, Geocoder, DateRange} from 'components/controls'
import {locate} from 'actions/geolocation'
import {formatAsDay, parseFromDay} from 'utils/date'
import get from 'lodash/get'
import * as courses from 'selectors/ast/courses'

const {isArray} = Array
const courseOptions = new Map([
    ['AST1', 'AST 1'],
    ['AST1+', 'AST 1 + MAT'],
    ['AST2', 'AST 2'],
    ['CRS', 'Companion Rescue (CRS)'],
    ['MAT', 'Managing Avalanche Terrain (MAT)'],
])

const STYLE = {
    margin: 'auto 3em',
    position: 'relative',
    width: '90%',
}


@connect(courses.form, {locate})
@withRouter
export class Courses extends Component {
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
    handlePlaceChange = place => {
        const {router, location} = this.props

        router.replace({
            ...location,
            state: {
                place
            }
        })
    }
    handleDateRangeChange = ({from, to}) => {
        this.replaceQuery({
            from: from ? formatAsDay(from) : undefined,
            to: to ? formatAsDay(to) : undefined,
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
    render() {
        const {location, tagOptions} = this.props
        const {query, state} = location
        let {
            course = '',
            tags = [],
            from,
            to
        } = query

        tags = isArray(tags) ? tags : [tags]
        tags = tags.map(tag => tag.toUpperCase())
        const tagSet = new Set(tags)

        const geoname = get(state, 'place.text')

        from = from && parseFromDay(from)
        to = to && parseFromDay(to)

        course = course.toUpperCase().trim()

        return (
            <Form style={STYLE}>
                <Legend>Find a course</Legend>
                <ControlSet horizontal>
                    <Control>
                        <DropdownFromOptions onChange={this.handleCourseChange} value={course} placeholder='Course' options={courseOptions} />
                    </Control>
                    <Control>
                        <DateRange from={from} to={to} onChange={this.handleDateRangeChange} container={this} />
                    </Control>
                    <Control>
                        <DropdownFromOptions multiple onChange={this.handleTagsChange} value={tagSet} placeholder='Filter by' options={tagOptions} />
                    </Control>
                    <Control>
                        <Geocoder placeholder='Location' onChange={this.handlePlaceChange} value={geoname} />
                    </Control>
                </ControlSet>
            </Form>
        )
    }
}

export function Providers() {
    return (
        <Form style={STYLE}>
            <Legend>Find a provider</Legend>
        </Form>
    )
}
