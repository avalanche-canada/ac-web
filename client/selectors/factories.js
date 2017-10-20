import { createSelector } from 'reselect'
import { getEntitiesForSchema } from 'getters/entities'
import noop from 'lodash/noop'
import { ASC, DESC } from 'constants/sortings'
import { parse } from 'utils/search'

export function createSorter(
    getEntities,
    getSorting = getSortingFromProps,
    sorters = new Map()
) {
    return createSelector(
        getEntities,
        getSorting,
        (entities, [name, order]) => {
            let sorter

            if (sorters.has(name)) {
                sorter = sorters.get(name)
            } else if (typeof name === 'string') {
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

function getPageFromProps(state, props) {
    return props.page
}

function getPageSizeFromProps(state, props) {
    return props.pageSize
}

function getSortingFromProps(state, props) {
    return props.sorting
}

export function createPagination(
    getEntities,
    getPage = getPageFromProps,
    getPageSize = getPageSizeFromProps
) {
    return createSelector(
        getEntities,
        getPage,
        getPageSize,
        ({ size }, page = 1, pageSize = 25) => ({
            page,
            pageSize,
            count: size,
            total: Math.ceil(size / pageSize),
        })
    )
}

function filterReducer(entities, filter) {
    return entities.filter(filter)
}

export function createFilteredEntities(getEntities, getFilters) {
    return createSelector(getEntities, getFilters, (entities, filters) =>
        filters.reduce(filterReducer, entities)
    )
}

function getQueryFromLocation(state, { location }) {
    return parse(location.search)
}

export function createGetFilters(allFilters, getQuery = getQueryFromLocation) {
    return function getFilters(state, props) {
        const query = getQuery(state, props)

        return Object.keys(query).reduce((filters, key) => {
            if (allFilters.has(key) && query[key] !== null) {
                filters.push(allFilters.get(key)(query))
            }

            return filters
        }, [])
    }
}

export function createPaginatedEntities(getEntities, getPagination) {
    return createSelector(
        getEntities,
        getPagination,
        (entities, { page, pageSize }) => {
            const begin = (page - 1) * pageSize
            const end = begin + pageSize

            return entities.slice(begin, end)
        }
    )
}

export function createGetEntitiesForSchema(schema, getParamsFromProps = noop) {
    return (state, props) =>
        getEntitiesForSchema(state, schema, getParamsFromProps(props))
}
