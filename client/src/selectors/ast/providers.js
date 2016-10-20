import React from 'react'
import {createSelector} from 'reselect'
import {List} from 'immutable'
import {Provider} from 'api/schemas'
import * as Columns from './columns'
import * as entities from './entities'

function isSponsor(provider) {
    return provider.isSponsor
}

export const table = createSelector(
    entities.table(
        Provider,
        List.of(
            Columns.provider,
            Columns.contacts,
            Columns.distance,
            Columns.location,
            Columns.tags,
        ),
    ),
    ({entities, ...props}) => ({
        ...props,
        featured: entities.filter(isSponsor),
        rows: entities.filterNot(isSponsor),
    })
)


export const form = createSelector(
    table,
    function mapFormStateToProps({tags}) {
        return {
            legend: 'Find a provider',
            tagOptions: new Map([...tags].map(tag => [tag, tag])),
        }
    }
)
