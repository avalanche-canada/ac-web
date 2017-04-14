import {createSelector} from 'reselect'
import {HeaderCellOrders} from '~/components/table'
import {getEntitiesForSchema} from 'getters/entities'
import noop from 'lodash/noop'

const {ASC, DESC, NONE} = HeaderCellOrders

export function createSorter(
    getEntities,
    getSorting = defaultGetSorting,
    sorters = new Map()
) {
    return createSelector(
        getEntities, getSorting,
        (entities, [name, order]) => {
            let sorter

            if (sorters.has(name)) {
                sorter = sorters.get(name)
            } else if (typeof(name) === 'string') {
                sorter = entity => entity[name]
            }

            if (!sorter) {
                return entities
            }

            switch (order) {
                case ASC:
                    return entities.sortBy(sorter)
                case DESC:
                    return entities.sortBy(sorter).reverse()
                default:
                    return entities
            }
        }
    )
}

function defaultGetPage(state, props) {
    return props.page
}
function defaultGetPageSize(state, props) {
    return props.pageSize
}
const ARRAY = []
function defaultGetSorting(state, props) {
    return props.sorting
}

export function createPagination(
    getEntities,
    getPage = defaultGetPage,
    getPageSize = defaultGetPageSize,
) {
    return createSelector(
        getEntities, getPage, getPageSize,
        ({size}, page = 1, pageSize = 25) => ({
            page,
            pageSize,
            count: size,
            total: Math.ceil(size / pageSize),
        })
    )
}

export function createFilteredEntities(getEntities, getFilters) {
    const reducer = (entities, filter) => entities.filter(filter)

    return createSelector(
        getEntities,
        getFilters,
        (entities, filters) => filters.reduce(reducer, entities)
    )
}

export function createPaginatedEntities(getEntities, getPagination) {
    return createSelector(
        getEntities, getPagination,
        (entities, {page, pageSize}) => {
            const begin = (page - 1) * pageSize
            const end = begin + pageSize

            return entities.slice(begin, end)
        }
    )
}

export function createGetEntitiesForSchema(schema, getParamsFromProps = noop) {
    return (state, props) => getEntitiesForSchema(
        state,
        schema,
        getParamsFromProps(props)
    )
}
