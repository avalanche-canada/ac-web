import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import parseDate from 'date-fns/parse'
import { parse } from '~/utils/search'
import get from 'lodash/get'
import { Form as Base, Legend, Control, ControlSet } from '~/components/form'
import { DropdownFromOptions, Geocoder, DateRange } from '~/components/controls'
import { locate } from '~/actions/geolocation'
import * as courses from '~/selectors/ast/courses'
import * as providers from '~/selectors/ast/providers'
import {
    valueHandlerFactory,
    arrayValueHandlerFactory,
    dateRangeValueHandlerFactory,
    replace,
} from '~/utils/router'

const STYLE = {
    margin: 'auto',
    position: 'relative',
}

Form.propTypes = {
    legend: PropTypes.string,
    location: PropTypes.shape({
        search: PropTypes.string,
        state: PropTypes.object,
    }).isRequired,
    tagOptions: PropTypes.instanceOf(Map),
    levelOptions: PropTypes.instanceOf(Map),
    onLevelChange: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
    onTagsChange: PropTypes.func.isRequired,
    onPlaceChange: PropTypes.func.isRequired,
    withDateRange: PropTypes.bool,
}

function Form({
    legend,
    location,
    tagOptions,
    levelOptions,
    onLevelChange,
    onDateRangeChange,
    onTagsChange,
    onPlaceChange,
    withDateRange,
}) {
    // TODO: move this parsing to layout!
    let { level = '', tags = [], from, to } = parse(location.search)

    tags = Array.isArray(tags) ? tags : [tags]

    if (typeof level === 'string') {
        level = level.toUpperCase().trim()
    }

    return (
        <Base style={STYLE}>
            <Legend>
                {legend}
            </Legend>
            <ControlSet horizontal>
                {levelOptions &&
                    <Control>
                        <DropdownFromOptions
                            onChange={onLevelChange}
                            value={level}
                            placeholder="Level"
                            options={levelOptions}
                        />
                    </Control>}
                {withDateRange &&
                    <Control>
                        <DateRange
                            from={from && parseDate(from)}
                            to={to && parseDate(to)}
                            onChange={onDateRangeChange}
                            container={this}
                        />
                    </Control>}
                <Control>
                    <DropdownFromOptions
                        multiple
                        onChange={onTagsChange}
                        value={new Set(tags.map(tag => tag.toUpperCase()))}
                        placeholder="Filter by"
                        options={tagOptions}
                    />
                </Control>
                <Control>
                    <Geocoder
                        placeholder="Location"
                        onChange={onPlaceChange}
                        value={get(location, 'state.place.text')}
                    />
                </Control>
            </ControlSet>
        </Base>
    )
}

const Container = compose(
    withRouter,
    lifecycle({
        componentDidMount() {
            this.props.locate()
        },
    }),
    withHandlers({
        onLevelChange: valueHandlerFactory('level'),
        onTagsChange: arrayValueHandlerFactory('tags'),
        onDateRangeChange: dateRangeValueHandlerFactory(),
        onPlaceChange(props) {
            return place => {
                const location = {
                    state: {
                        place,
                    },
                    search: '?sorting=distance',
                }

                replace(props, location)
            }
        },
    })
)(Form)

export const Courses = compose(
    connect(courses.form, { locate }),
    withProps({
        withDateRange: true,
    })
)(Container)

export const Providers = connect(providers.form, { locate })(Container)
