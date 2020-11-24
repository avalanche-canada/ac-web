import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import * as Page from 'components/page'
import { Sorting } from 'components/button'
import { FlexContentCell } from 'components/table'
import PaginationComponent from 'components/pagination'
import { Details } from 'components/error'
import { Muted } from 'components/text'
import * as Async from 'contexts/async'
import { pluralize } from 'utils/string'
import { FormattedMessage, useIntl, defineMessages } from 'react-intl'

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
    const pluralized = pluralize(type, 2)
    const all = 'All ' + pluralized
    const title = total === 0 ? all : `${all} (${total})`

    return (
        <Fragment>
            {title}
            {count !== total ? (
                <small>
                    <FormattedMessage description="Layout ast/tables/utils" defaultMessage="Currently showing {items}, <link>reset your criteria</link>." values={
                        {
                            items: pluralize(type, count, true),
                            link(text) {
                                return (
                                    <Link to={`/training/${pluralized}`}>
                                        {text}
                                    </Link>
                                )
                            },
                        }
                    } />
                </small>
            ) : null}
        </Fragment>
    )
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
    const intl = useIntl()
    const messages = defineMessages({
        loadingError: {
            id: 'app.loadingError',
            defaultMessage: 'An error happened while loading the {pluralized}...',
            description: 'Layout ast/tables/utils',
        }
    })
    const pluralized = pluralize(type, 2)

    return (
        <caption>
            <Async.Error>
                <Details summary={intl.formatMessage(messages.loadingError, { pluralized })} />
            </Async.Error>
            <Async.Pending>
                <Muted>
                    <FormattedMessage
                        description="Layout ast/tables/utils"
                        defaultMessage="Loading {pluralized}..."
                        values={{
                            pluralized
                        }}
                    />
                </Muted>
            </Async.Pending>
            <Async.Found>{empty && children}</Async.Found>
        </caption>
    )
}
