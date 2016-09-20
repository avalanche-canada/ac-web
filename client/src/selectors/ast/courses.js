import React from 'react'
import {Link} from 'react-router'
import {createSelector} from 'reselect'
import {List, fromJS} from 'immutable'
import turf from 'turf-helpers'
import distance from 'turf-distance'
import {Course} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import {Phone, Mailto, DateElement, Helper, P} from 'components/misc'
import {HeaderCellOrders} from 'components/table'
import {getLocationAsFeature} from 'selectors/geolocation'
import {getPlace, getPlaceAsFeature} from 'selectors/router'
import * as entities from './entities'
import get from 'lodash/get'
import * as Columns from './columns'

const {ASC, DESC, NONE} = HeaderCellOrders
const {keys, assign} = Object
const {isArray} = Array

function asControlled({description, provider}) {
    const {name, email, phone, website, prim_contact, location} = provider

    return {
        Name: name,
        Description: description,
        Website() {
            return (
                <a href={website} target='_blank'>{website}</a>
            )
        },
        Email() {
            return (
                <Mailto email={email} />
            )
        },
        Phone() {
            return (
                <Phone phone={phone} />
            )
        },
        Location: location,
    }
}

const courseOptions = new Map([
    ['AST1', 'AST 1'],
    ['AST1+', 'AST 1 + MAT'],
    ['AST2', 'AST 2'],
    ['CRS', 'Companion Rescue (CRS)'],
    ['MAT', 'Managing Avalanche Terrain (MAT)'],
])

function isSponsor({provider}) {
    return provider.is_sponsor
}

function updateCourse(course) {
    return assign(course, {
        name: courseOptions.get(course.level)
    })
}

export const table = createSelector(
    entities.table(
        Course,
        List.of(
            Columns.dateRanges,
            Columns.course,
            Columns.courseProvider,
            Columns.distance,
            Columns.location,
            Columns.tags,
            Columns.cost,
        ),
        ({provider}) => provider.is_sponsor,
    ),
    ({entities, ...props}) => {
        entities = entities.map(updateCourse)

        return {
            ...props,
            featured: entities.filter(isSponsor),
            rows: entities.filterNot(isSponsor),
            asControlled,
        }
    }
)

export const form = createSelector(
    table,
    function mapFormStateToProps({tags}) {
        return {
            legend: 'Find a course',
            tagOptions: new Map([...tags].map(tag => [tag, tag])),
            courseOptions,
        }
    }
)
