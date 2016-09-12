import React, {Component} from 'react'
import {compose, lifecycle, withProps, withHandlers, withState, setDisplayName, toClass} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Form as Base, Legend, Control, ControlSet} from 'components/form'
import {DropdownFromOptions, Input, Geocoder, DateRange} from 'components/controls'
import {locate} from 'actions/geolocation'
import {formatAsDay, parseFromDay} from 'utils/date'
import get from 'lodash/get'
import * as courses from 'selectors/ast/courses'
import * as providers from 'selectors/ast/providers'
import {replaceQuery, replaceState} from 'utils/router'

const {isArray} = Array
const STYLE = {
    margin: 'auto'
}
function Form({
    legend,
    location,
    tagOptions,
    courseOptions,
    onCourseChange,
    onDateRangeChange,
    onTagsChange,
    onPlaceChange,
    withDateRange,
}) {
    const {query, state} = location
    let {
        course = '',
        tags = [],
        from,
        to
    } = query

    tags = isArray(tags) ? tags : [tags]

    return (
        <Base style={STYLE}>
            <Legend>{legend}</Legend>
            <ControlSet horizontal>
                {courseOptions && (
                    <Control>
                        <DropdownFromOptions
                            onChange={onCourseChange}
                            value={course.toUpperCase().trim()}
                            placeholder='Course'
                            options={courseOptions} />
                    </Control>
                )}
                {withDateRange && (
                    <Control>
                        <DateRange
                            from={from && parseFromDay(from)}
                            to={to && parseFromDay(to)}
                            onChange={onDateRangeChange}
                            container={this} />
                    </Control>
                )}
                <Control>
                    <DropdownFromOptions
                        multiple
                        onChange={onTagsChange}
                        value={new Set(tags.map(tag => tag.toUpperCase()))}
                        placeholder='Filter by'
                        options={tagOptions} />
                </Control>
                <Control>
                    <Geocoder
                        placeholder='Location'
                        onChange={onPlaceChange}
                        value={get(state, 'place.text')} />
                </Control>
            </ControlSet>
        </Base>
    )
}

const Container = compose(
    toClass,
    withRouter,
    lifecycle({
        componentDidMount() {
            this.props.locate()
        }
    }),
    withHandlers({
        onCourseChange: props => course => {
            replaceQuery({
                course: course || undefined
            }, props)
        },
        onTagsChange: props => tags => {
            replaceQuery({
                tags: tags.size > 0 ? [...tags] : undefined
            }, props)
        },
        onPlaceChange: props => place => {
            replaceState({
                place
            }, props)
        },
        onDateRangeChange: props => ({from, to}) => {
            replaceQuery({
                from: from ? formatAsDay(from) : undefined,
                to: to ? formatAsDay(to) : undefined,
            }, props)
        },
    }),
)(Form)

export const Courses = compose(
    connect(courses.form, {locate}),
    withProps({
        withDateRange: true,
    }),
)(Container)

export const Providers = connect(providers.form, {locate})(Container)
