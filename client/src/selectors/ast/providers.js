import {createSelector} from 'reselect'
import {List} from 'immutable'
import {Provider} from '~/api/schemas'
import * as Columns from './columns'
import * as entities from './entities'

export const table = entities.table(
    Provider,
    List.of(
        Columns.provider,
        Columns.contacts,
        Columns.distance,
        Columns.location,
        Columns.tags,
    )
)

export const form = createSelector(
    table,
    ({tags}) => ({
        legend: 'Find a provider',
        tagOptions: new Map([...tags].map(tag => [tag, tag])),
    })
)
