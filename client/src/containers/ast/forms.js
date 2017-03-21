import React, {Component} from 'react'
import {compose, lifecycle, withProps, withHandlers, withState, setDisplayName, toClass} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Form as Base, Legend, Control, ControlSet} from 'components/form'
import {DropdownFromOptions, Input, Geocoder, DateRange} from 'components/controls'
import {locate} from 'actions/geolocation'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import get from 'lodash/get'
import * as courses from 'selectors/ast/courses'
import * as providers from 'selectors/ast/providers'
import {replace, valueHandlerFactory, arrayValueHandlerFactory} from 'utils/router'

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

        tags = Array.isArray(tags) ? tags : [tags]

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
                                from={from && parse(from)}
                                to={to && parse(to)}
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
        onLevelChange: valueHandlerFactory('level'),
        onTagsChange: arrayValueHandlerFactory('tags'),
        onDateRangeChange: props => ({from, to}) => {
            replace({
                query: {
                    from: from ? format(from, 'YYYY-MM-DD') : undefined,
                    to: to ? format(to, 'YYYY-MM-DD') : undefined,
                }
            }, props)
        },
        onPlaceChange: props => place => {
            replace({
                state: {
                    place
                },
                query: {
                    sorting: 'distance'
                }
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
