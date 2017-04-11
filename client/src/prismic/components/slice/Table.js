import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {compose, withHandlers, withState, withProps} from 'recompose'
import {connect} from 'react-redux'
import {load} from 'actions/prismic'
import {createSelector, createStructuredSelector} from 'reselect'
import {getDocumentsOfType} from 'getters/prismic'
import {HeaderCellOrders, Caption, Responsive, PageSizeSelector} from 'components/table'
import Table, {Column, Body} from 'components/table/managed'
import {FilterSet, FilterEntry} from 'components/filter'
import Pagination from 'components/pagination'
import {Status, InnerHTML, Br} from 'components/misc'
import {DropdownFromOptions as Dropdown} from 'components/controls'
import transform from '/prismic/transformers'
import get from 'lodash/get'
import {prismic} from '/containers/connectors'
import {getStatusFactory} from '/selectors/prismic/utils'
import * as Factories from '/selectors/factories'

const {NONE} = HeaderCellOrders
const YES = 'Yes'
const NO = 'No'
const ARRAY = []

const getColumns = createSelector(
    getContent,
    columns => columns.map(column => {
        const {name, sortable, type, property, option1, option2, option3} = column

        return Column.create({
            name: property,
            title: name,
            sorting: sortable === YES ? NONE : undefined,
            property: createProperty(type, property, option1, option2, option3),
        })
    })
)

const getUpdatedColumns = createSelector(
    getColumns, getFilterings,
    (columns, filterings) => columns.map(column => {
        if (filterings.has(column.property)) {

        }

        return column
    })
)

const getTransformedRows = createSelector(
    (state, props) => getDocumentsOfType(state, getDocumentType(props)),
    documents => documents.map(document => transform(document)).toList()
)

const getFilters = createSelector(
    getContent, getTransformedRows, getFilterings,
    (columns, rows, filterings) => columns
        .filter(column => column.filterable === YES)
        .map(({name, property}) => {
            const options = rows.map(row => row[property]).filter(Boolean)
                                .toSet().sort().toArray()

            return {
                property,
                options: new Map(options.map(option => [option, option])),
                value: filterings.has(property) ? filterings.get(property) : new Set(),
                placeholder: name,
            }
        })
)

const getActiveFilters = createSelector(
    getFilters,
    filters => filters
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
    rows => Immutable.List.of(Body.create({
        data: rows
    }))
)

const getMessages = createSelector(
    (state, props) => getDocumentType(props),
    type => ({
        isLoading: `Loading ${type}...`
    })
)

const mapStateToProps = createStructuredSelector({
    filters: getFilters,
    columns: getUpdatedColumns,
    bodies: getBodies,
    pagination: getPagination,
    status: getStatusFactory(getMessages),
})

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
    const {total, count, pageSize, page} = pagination

    return (
        <div>
            <Br />
            <FilterSet>
            {filters.map(({property, ...filter}) => (
                <FilterEntry>
                    <Dropdown onChange={onFilterChange.bind(null, property)} {...filter} />
                </FilterEntry>
            ))}
            </FilterSet>
            <Responsive>
                <Table bordered columns={columns} bodies={bodies} onSortingChange={onSortingChange} />
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
                pageSize: 150
            }
        }
    })),
    withState('sorting', 'setSorting', []),
    withState('filterings', 'setFilterings', new Map()),
    withState('pageSize', 'setPageSize', 25),
    withState('page', 'setPage', 1),
    prismic(mapStateToProps),
    withHandlers({
        onFilterChange: props => (property, value) => {
            const {filterings} = props

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
        }
    }),
)(Container)

function getDocumentType(props) {
    return get(props, 'content[0].source')
}
function getContent(state, props) {
    return props.content || ARRAY
}
function createProperty(type, property, option1, option2, option3) {
    switch (type) {
        case 'Link':
            // TODO: Target could be provided as option, named option like "target"
            return data => (
                <a href={data[option1]} target='_blank'>
                    {data[property]}
                </a>
            )
        case 'Number':
        case 'Currency':
        case 'Date':
        case 'Time':
        case 'DateTime':
            return property
        case 'Html':
            return data => (
                <InnerHTML>
                    {data[property]}
                </InnerHTML>
            )
        default:
            return property

    }
}
function getFilterings(state, props) {
    return props.filterings
}
