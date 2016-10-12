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
import {replaceQuery, replaceStateAndQuery} from 'utils/router'

const {isArray} = Array
const STYLE = {
    margin: 'auto',
    position: 'relative',
}
class Form extends Component {
    render() {
        const {
            legend,
            location: {query, state},
            tagOptions,
            levelOptions,
            onLevelChange,
            onDateRangeChange,
            onTagsChange,
            onPlaceChange,
            withDateRange,
        } = this.props
        let {
            level = '',
            tags = [],
            from,
            to
        } = query

        tags = isArray(tags) ? tags : [tags]

        return (
            <Base style={STYLE}>
                <Legend>{legend}</Legend>
                <ControlSet horizontal>
                    {levelOptions && (
                        <Control>
                            <DropdownFromOptions
                                onChange={onLevelChange}
                                value={level.toUpperCase().trim()}
                                placeholder='Level'
                                options={levelOptions} />
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
}

const Container = compose(
    withRouter,
    lifecycle({
        componentDidMount() {
            this.props.locate()
        }
    }),
    withHandlers({
        onLevelChange: props => level => {
            replaceQuery({
                level: level || undefined
            }, props)
        },
        onTagsChange: props => tags => {
            replaceQuery({
                tags: tags.size > 0 ? [...tags] : undefined
            }, props)
        },
        onPlaceChange: props => place => {
            replaceStateAndQuery({
                place
            }, {
                sorting: ['distance', 'asc'],
            }, props)
        },
        onDateRangeChange: props => ({from, to}) => {
            replaceQuery({
                from: from ? formatAsDay(from) : undefined,
                to: to ? formatAsDay(to) : undefined,
            }, props)
        },
    }),
)(toClass(Form))

export const Courses = compose(
    connect(courses.form, {locate}),
    withProps({
        withDateRange: true,
    }),
)(Container)

export const Providers = connect(providers.form, {locate})(Container)
