import React from 'react'
import {Link} from 'react-router'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import {Course} from '~/api/schemas'
import {Phone, Mailto, DateElement, Helper, P} from '~/components/misc'
import * as entities from './entities'
import * as Columns from './columns'

function asControlled({description, provider}) {
    const {name, email, phone, website, location} = provider

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

// TODO: Should come from the server!
const levelOptions = new Map([
    ['AST1', 'AST 1'],
    ['AST1+', 'AST 1 + MAT'],
    ['AST1+2', 'AST 1 + AST 2 Combined'],
    ['AST2', 'AST 2'],
    ['CRS', 'Companion Rescue (CRS)'],
    ['MAT', 'Managing Avalanche Terrain (MAT)'],
])

export const table = createSelector(
    entities.table(
        Course,
        List.of(
            Columns.dateRanges,
            Columns.level,
            Columns.courseProvider,
            Columns.distance,
            Columns.location,
            Columns.tags,
            Columns.cost,
        )
    ),
    props => ({
        ...props,
        asControlled,
    })
)

export const form = createSelector(
    table,
    ({tags}) => ({
        legend: 'Find a course',
        tagOptions: new Map([...tags].map(tag => [tag, tag])),
        levelOptions,
    })
)
