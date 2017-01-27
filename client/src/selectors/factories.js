import {createSelector} from 'reselect'
import {HeaderCellOrders} from 'components/table'
import {getEntitiesForSchema} from 'getters/entities'
import noop from 'lodash/noop'

const {ASC, DESC, NONE} = HeaderCellOrders

export function createSorter(entitiesGetter, sortingGetter, sorters = Map()) {
    return createSelector(
        entitiesGetter,
        sortingGetter,
        (entities, [name, order]) => {
            if (!sorters.has(name)) {
                return entities
            }

            const sorter = sorters.get(name)

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

function defaultGetPage(state, {page}) {
    return page
}
function defaultGetPageSize(state, {pageSize}) {
    return pageSize
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
