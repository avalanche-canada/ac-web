import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { compose, withHandlers, withState, withProps } from 'recompose'
import { createSelector, createStructuredSelector } from 'reselect'
import { getDocumentsOfType } from '~/getters/prismic'
import { Responsive, PageSizeSelector } from '~/components/table'
import Table, { Column, Body } from '~/components/table/managed'
import { FilterSet, FilterEntry } from '~/components/filter'
import Pagination from '~/components/pagination'
import { Status, Br } from '~/components/misc'
import { DropdownFromOptions as Dropdown } from '~/components/controls'
import { parseForMap } from '~/prismic'
import { parseData } from '~/prismic/parsers'
import get from 'lodash/get'
import { prismic } from '~/containers/connectors'
import { getStatusFactory } from '~/selectors/prismic/utils'
import * as Factories from '~/selectors/factories'
import { NONE } from '~/constants/sortings'
import { StructuredText } from '~/prismic/components/base'

const YES = 'Yes'
const ARRAY = []

const getColumns = createSelector(getContent, columns =>
    columns.map(column => {
        const {
            name,
            sortable,
            type,
            property,
            option1,
            option2,
            option3,
        } = column

        return Column.create({
            name: property,
            title: name,
            sorting: sortable === YES ? NONE : undefined,
            property: createProperty(type, property, option1, option2, option3),
        })
    })
)

const getTransformedRows = createSelector(
    (state, props) => getDocumentsOfType(state, getDocumentType(props)),
    documents => documents.toList().map(parseForMap).map(row => row.data)
)

const getFilters = createSelector(
    getContent,
    getTransformedRows,
    getFilterings,
    (columns, rows, filterings) =>
        columns
            .filter(column => column.filterable === YES)
            .map(({ name, property }) => {
                const options = rows
                    .map(row => row[property])
                    .filter(Boolean)
                    .toSet()
                    .sort()
                    .toArray()

                return {
                    property,
                    options: new Map(options.map(option => [option, option])),
                    value: filterings.has(property)
                        ? filterings.get(property)
                        : new Set(),
                    placeholder: name,
                }
            })
)

const getActiveFilters = createSelector(getFilters, filters =>
    filters
        .filter(filter => filter.value.size > 0)
        .map(filter => row => filter.value.has(row[filter.property]))
)

const getFilteredRows = Factories.createFilteredEntities(
    getTransformedRows,
    getActiveFilters
)
const getPagination = Factories.createPagination(getFilteredRows)
const getSortedRows = Factories.createSorter(getFilteredRows)
const getBodies = createSelector(
    Factories.createPaginatedEntities(getSortedRows, getPagination),
    rows =>
        Immutable.List.of(
            Body.create({
                data: rows,
            })
        )
)

const getMessages = createSelector(
    (state, props) => getDocumentType(props),
    type => ({
        isLoading: `Loading ${type}...`,
    })
)

const mapStateToProps = createStructuredSelector({
    filters: getFilters,
    columns: getColumns,
    bodies: getBodies,
    pagination: getPagination,
    status: getStatusFactory(getMessages),
})

Container.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    bodies: PropTypes.arrayOf(PropTypes.object),
    filters: PropTypes.arrayOf(PropTypes.object),
    // TODO: Use appropriate propType
    status: PropTypes.object,
    // TODO: Use appropriate propType
    pagination: PropTypes.object,
    onPageSizeChange: PropTypes.func,
    onPageChange: PropTypes.func,
    onSortingChange: PropTypes.func,
    onFilterChange: PropTypes.func,
}

function Container({
    columns,
    bodies,
    filters = [],
    status,
    pagination = {},
    onPageSizeChange,
    onPageChange,
    onSortingChange,
    onFilterChange,
}) {
    const { total, pageSize, page } = pagination

    return (
        <div>
            <Br />
            <FilterSet>
                {filters.map(({ property, ...filter }) => (
                    <FilterEntry>
                        <Dropdown
                            onChange={onFilterChange.bind(null, property)}
                            {...filter}
                        />
                    </FilterEntry>
                ))}
            </FilterSet>
            <Responsive>
                <Table
                    bordered
                    columns={columns}
                    bodies={bodies}
                    onSortingChange={onSortingChange}
                />
            </Responsive>
            <Status {...status.toJSON()} />
            <PageSizeSelector value={pageSize} onChange={onPageSizeChange} />
            <Pagination active={page} onChange={onPageChange} total={total} />
        </div>
    )
}

export default compose(
    withProps(props => ({
        params: {
            type: getDocumentType(props),
            options: {
                pageSize: 150,
            },
        },
    })),
    withState('sorting', 'setSorting', []),
    withState('filterings', 'setFilterings', new Map()),
    withState('pageSize', 'setPageSize', 25),
    withState('page', 'setPage', 1),
    prismic(mapStateToProps),
    withHandlers({
        onFilterChange: props => (property, value) => {
            const { filterings } = props

            filterings.set(property, value)

            props.setFilterings(new Map([...filterings]))
        },
        onSortingChange: props => (...args) => {
            props.setSorting(args)
        },
        onPageSizeChange: props => pageSize => {
            props.setPage(1)
            props.setPageSize(pageSize)
        },
        onPageChange: props => page => {
            props.setPage(page)
        },
    })
)(Container)

function getDocumentType(props) {
    return get(props, ['value', 0, 'source', 'value'])
}
function getContent(state, { value = ARRAY }) {
    return value.map(data => parseData(data))
}
// TODO: Look to use children as function
function createProperty(type, property, option1) {
    switch (type) {
        case 'Link':
            // TODO: Target could be provided as option, named option like "target"
            return function link(data) {
                return (
                    <a href={data[option1]} target="_blank">
                        {data[property]}
                    </a>
                )
            }
        case 'Number':
        case 'Currency':
        case 'Date':
        case 'Time':
        case 'DateTime':
            return property
        case 'Html':
            return function html(data) {
                return <StructuredText value={data[property]} />
            }
        default:
            return property
    }
}
function getFilterings(state, props) {
    return props.filterings
}
