import React from 'react'
import PropTypes from 'prop-types'
import * as Page from 'components/page'
import { Sorting } from 'components/button'
import { FlexContentCell } from 'components/table'
import PaginationComponent from 'components/pagination'
import { Muted } from 'components/text'
import * as Async from 'contexts/async'

Header.propTypes = {
    columns: PropTypes.array.isRequired,
    sorting: PropTypes.array,
    place: PropTypes.object,
    onSortingChange: PropTypes.func.isRequired,
}

export function Header(props) {
    const { columns, sorting, onSortingChange } = props
    function getSorting(name, order) {
        if (Array.isArray(sorting) && sorting[0] === name) {
            return sorting[1]
        }

        return order
    }

    return (
        <thead>
            <tr>
                {columns.map(
                    ({ title, name, property, sorting, ...header }) => (
                        <FlexContentCell key={name} {...header}>
                            {typeof title === 'function' ? title(props) : title}
                            <Sorting
                                onChange={onSortingChange.bind(null, name)}
                                sorting={getSorting(name, sorting)}
                            />
                        </FlexContentCell>
                    )
                )}
            </tr>
        </thead>
    )
}

Title.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}

export function Title({ type, count, total }) {
    const title = 'All ' + type

    if (total === 0) {
        return title
    }

    if (count === total) {
        return `${title} (${total})`
    }

    return `${title} (${count} of ${total})`
}

Layout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

export function Layout({ title, children }) {
    return (
        <Page.Article>
            <Page.Header title={title} />
            {children}
        </Page.Article>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    count: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

export function Pagination({ page, count, pageSize = 25, onChange }) {
    if (count < 2) {
        return null
    }

    const total = Math.ceil(count / pageSize)

    return (
        <PaginationComponent total={total} active={page} onChange={onChange} />
    )
}

Caption.propTypes = {
    type: PropTypes.string.isRequired,
    empty: PropTypes.bool.isRequired,
    children: PropTypes.node,
}

export function Caption({ type, empty, children }) {
    return (
        <caption>
            <Async.Error>
                <ErrorDetails type={type} />
            </Async.Error>
            <Async.Pending>
                <Muted>Loading providers...</Muted>
            </Async.Pending>
            <Async.Found>{empty && children}</Async.Found>
        </caption>
    )
}

ErrorDetails.propTypes = {
    type: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(Error),
}

export function ErrorDetails({ type, error }) {
    return (
        <details>
            <summary>An error happened while loading the {type}...</summary>
            {error.message}
        </details>
    )
}
