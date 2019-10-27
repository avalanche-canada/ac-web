import React, { Fragment, useReducer } from 'react'
import PropTypes from 'prop-types'
import { Responsive, PageSizeSelector, FlexContentCell } from 'components/table'
import { Sorting as SortingButton } from 'components/button'
import Pagination from 'components/pagination'
import { Loading, Muted } from 'components/text'
import { Br } from 'components/misc'
import { NONE, DESC } from 'constants/sortings'
import { StructuredText } from 'prismic/components/base'
import * as Predicates from 'prismic/predicates'
import { useSearch } from 'prismic/hooks'

PrismicTable.propTypes = {
    value: PropTypes.array.isRequired,
}

export default function PrismicTable({ value }) {
    const columns = value.map(createColumn)
    const type = value?.[0]?.source
    const [state, dispatch] = useReducer(reducer, {
        sorting: [null, NONE],
        pageSize: 10,
        page: 1,
        onSortingChange(...sorting) {
            dispatch([Sorting, sorting])
        },
        onPageSizeChange(pageSize) {
            dispatch([PageSize, pageSize])
        },
        onPageChange(page) {
            dispatch([Page, page])
        },
    })
    const orderings = []
    const [name, order] = state.sorting

    if (name && order !== NONE) {
        orderings.push(
            `my.${type}.${name} ${order === DESC ? 'desc' : ''}`.trim()
        )
    }

    const params = {
        predicates: [Predicates.type(type)],
        orderings,
        pageSize: state.pageSize,
        page: state.page,
    }

    function getSorting(column) {
        if (column.sortable) {
            const [name, order] = state.sorting

            if (column.name === name) {
                return order
            }

            return NONE
        }
    }

    const [data = {}, pending] = useSearch(params)
    const { results = [], total_pages, total_results_size } = data

    return (
        <Fragment>
            <Br />
            <Responsive>
                <table>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <FlexContentCell key={column.name}>
                                    {column.title}
                                    <SortingButton
                                        sorting={getSorting(column)}
                                        onChange={state.onSortingChange.bind(
                                            null,
                                            column.name
                                        )}
                                    />
                                </FlexContentCell>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(row => (
                            <tr key={row.id}>
                                {columns.map(({ name, property }) => (
                                    <td key={name}>{property(row.data)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <caption>
                        {pending ? (
                            <Loading>Loading documents...</Loading>
                        ) : (
                            <Muted>
                                {`Total of ${total_results_size} documents
                                    found.`}
                            </Muted>
                        )}
                    </caption>
                </table>
            </Responsive>
            <PageSizeSelector
                value={state.pageSize}
                onChange={state.onPageSizeChange}
                suffix="documents par page"
            />
            <Pagination
                active={state.page}
                onChange={state.onPageChange}
                total={total_pages}
            />
        </Fragment>
    )
}

// Reducer and actions
const Sorting = Symbol('sorting')
const PageSize = Symbol('pagesize')
const Page = Symbol('page')
function reducer(state, [type, payload]) {
    switch (type) {
        case Sorting:
            return {
                ...state,
                sorting: payload,
                page: 1,
            }
        case PageSize:
            return {
                ...state,
                pageSize: payload,
                page: 1,
            }
        case Page:
            return {
                ...state,
                page: payload,
            }
        default:
            return state
    }
}

// Constants
const YES = 'Yes'

// Utils
function createProperty(type, property, option1) {
    switch (type) {
        case 'Link':
            return function link(data) {
                return (
                    <a href={data[option1]} target="_blank">
                        {data[property]}
                    </a>
                )
            }
        case 'Html':
            return function html(data) {
                return <StructuredText value={data[property]} />
            }
        default:
            return data => data[property]
    }
}

function createColumn({ name, sortable, type, property, filterable, option1 }) {
    return {
        name: property,
        title: name,
        sortable: sortable === YES,
        filterable: filterable === YES,
        property: createProperty(type, property, option1),
    }
}
