import React from 'react'
import {compose, lifecycle, withProps, withHandlers, setDisplayName} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Form, Legend, Control, ControlSet, Submit} from 'components/form'
import {DropdownFromOptions, Input} from 'components/controls'
import {Calendar, Place} from 'components/icons'
import {locate} from 'actions/geolocation'
import {findPlaces} from 'mapbox/api'
import {courses as mapStateToProps} from 'selectors/ast/forms'

const {isArray} = Array
function asSetParams(value) {
    return new Set(isArray(value) ? value : [value])
}
const STYLE = {
    margin: 'auto 3em'
}
const levelOptions = new Map([
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
    ['companion-rescue', 'Companion rescue'],
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

function CoursesForm({
    onLevelChange,
    onTypeChange,
    onLocationChange,
    onLocationSelect,
    onDateChange,
    levels,
    tags,
    date,
    location,
    point,
}) {
    const {query} = location


    return (
        <Form style={STYLE}>
            <Legend>Find a course</Legend>
            <ControlSet horizontal>
                <Control>
                    <DropdownFromOptions multiple onChange={onLevelChange} value={levels} placeholder='Level' options={levelOptions} />
                </Control>
                <Control icon={<Calendar />}>
                    <Input placeholder='Date' type='date' onChange={onDateChange} value={date} />
                </Control>
                <Control>
                    <DropdownFromOptions multiple onChange={onTypeChange} value={tags} placeholder='Filter by' options={tagOptions} />
                </Control>
                <Control icon={<Place />}>
                    <Input placeholder='Location' onChange={onLocationChange} />
                </Control>
                <Control>
                    <Submit>
                        Search
                    </Submit>
                </Control>
            </ControlSet>
        </Form>
    )
}

export const Courses = compose(
    withRouter,
    connect(null, {
        locate,
    }),
    withHandlers({
        onLevelChange: props => levels => {
            let value

            if (levels.size > 0) {
                value = [...levels]
            }

            replace('levels', value, props)
        },
        onTypeChange: props => tags => {
            let value

            if (tags.size > 0) {
                value = [...tags]
            }

            replace('tags', value, props)
        },
        onLocationChange: props => event => {
            const {value} = event.target

            if (value === '') {
                return
            }

            findPlaces(value)
            .then(response => response.data.features)
            .then(::console.warn)
            // replace('point', [...tags], props)
        },
        onLocationSelect: props => event => {
            replace('point', '0 0', props)
        },
        onDateChange: props => event => {
            const {value} = event.target

            replace('date', value || undefined, props)
        },
    }),
    withProps(({location}) => {
        const {tags, levels} = location.query

        return {
            tags: asSetParams(tags),
            levels: asSetParams(levels),
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.locate()
        },
        componentWillReceiveProps({location, point}) {
            if (location.key === this.props.location.key) {
                return
            }


        },
    }),
)(CoursesForm)
