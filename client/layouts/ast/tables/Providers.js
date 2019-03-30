import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import ErrorBoundary from 'components/ErrorBoundary'
import { Pending } from 'components/fetch'
import { Mailto, Phone } from 'components/anchors'
import { List, Term, Definition } from 'components/description'
import { Table, Responsive, TBody, Row, Cell, Caption } from 'components/table'
import Header from './Header'
import Pagination from './Pagination'
import Layout from './Layout'
import { Helper } from 'components/text'
import { Paginated, Sorted } from 'components/collection'
import Container from 'containers/ast/Providers'
import { Distance, Tags } from './cells'
import { NONE, DESC } from 'constants/sortings'
import { Error, Muted } from 'components/text'

Providers.propTypes = {
    tags: PropTypes.instanceOf(Set),
    sorting: PropTypes.arrayOf(PropTypes.string),
    place: PropTypes.object,
    onParamsChange: PropTypes.func.isRequired,
}

export default function Providers({ tags, sorting, place, onParamsChange }) {
    const fallback = <Error>An error happened while loading providers.</Error>
    const [page, setPage] = useState(1)
    function renderBodies(providers) {
        if (providers.length === 0) {
            return null
        }

        const [name, order] = sorting || []

        if (place) {
            providers = providers.map(provider => ({
                ...provider,
                distance: distance(turf.point(provider.loc), place),
            }))
        }

        return (
            <Fragment>
                <TBody featured title="Our sponsors">
                    {renderRows(providers.filter(isSponsor))}
                </TBody>
                <TBody>
                    <Sorted
                        values={providers.filter(isNotSponsor)}
                        sorter={SORTERS.get(name)}
                        reverse={order === DESC}>
                        <Paginated page={page}>{renderRows}</Paginated>
                    </Sorted>
                </TBody>
            </Fragment>
        )
    }
    function handleSortingChange(name, order) {
        onParamsChange({
            sorting: order === NONE ? null : [name, order],
        })
    }

    useEffect(() => {
        setPage(1)
    }, [tags, place, sorting])

    return (
        <ErrorBoundary fallback={fallback}>
            <Container tags={tags}>
                {({ providers }) => (
                    <Layout title={getTitle(providers)}>
                        <Responsive>
                            <Table>
                                <Header
                                    columns={COLUMNS}
                                    onSortingChange={handleSortingChange}
                                    sorting={sorting}
                                    place={place}
                                />
                                {Array.isArray(providers) &&
                                    renderBodies(providers)}
                                <Caption>
                                    <Pending>
                                        <Muted>Loading providers...</Muted>
                                    </Pending>
                                    {Array.isArray(providers) &&
                                        renderEmptyMessage(providers)}
                                </Caption>
                            </Table>
                        </Responsive>
                        {Array.isArray(providers) && (
                            <Pagination
                                count={providers.length}
                                page={page}
                                onChange={setPage}
                            />
                        )}
                    </Layout>
                )}
            </Container>
        </ErrorBoundary>
    )
}

const COLUMNS = [
    {
        name: 'provider',
        title: 'Provider name',
        property({ name }) {
            return name
        },
        sorting: NONE,
    },
    {
        name: 'contacts',
        title: 'Contacts',
        property({ email, phone, website }) {
            return (
                <List>
                    {email && (
                        <Entry term="Email">
                            <Mailto email={email} />
                        </Entry>
                    )}
                    {phone && (
                        <Entry term="Phone">
                            <Phone phone={phone} />
                        </Entry>
                    )}
                    {website && (
                        <Entry term="Website">
                            <Anchor href={website} />
                        </Entry>
                    )}
                </List>
            )
        },
    },
    {
        name: 'distance',
        title({ place }) {
            return place ? (
                <Helper
                    title={`Straight line between ${
                        place.text
                    } and the provider.`}>
                    Distance
                </Helper>
            ) : (
                'Distance'
            )
        },
        property({ distance }) {
            return <Distance value={distance} />
        },
        sorting: NONE,
    },
    {
        name: 'location',
        title: 'Location',
        property({ loc_description }) {
            return loc_description
        },
    },
    {
        name: 'tags',
        title: 'Tags',
        property({ tags }) {
            return <Tags value={tags} />
        },
    },
]

// Utils
function renderEmptyMessage({ length }) {
    return length === 0 ? (
        <div>
            No providers match your criteria, consider finding a course on the{' '}
            <Link to="/training/courses">courses page</Link>.
        </div>
    ) : null
}
function renderRows(providers) {
    return providers.map(renderRow)
}
function renderRow(row) {
    return (
        <Row key={row.id}>
            {COLUMNS.map(({ property, name }) => (
                <Cell key={name}>{property(row)}</Cell>
            ))}
        </Row>
    )
}
function getTitle(providers) {
    return Array.isArray(providers)
        ? `All providers (${providers.length})`
        : 'All providers'
}

const TERM_STYLE = {
    // minWidth: 75,
    flex: '0 1 25%',
}
const DEFINITION_STYLE = {
    maxWidth: 325,
    flex: '75%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}
function Entry({ term, children }) {
    return (
        <Fragment>
            <Term style={TERM_STYLE}>{term}</Term>
            <Definition style={DEFINITION_STYLE}>{children}</Definition>
        </Fragment>
    )
}
function Anchor({ href }) {
    return (
        <a href={href} title={href} target="_blank">
            {href.replace(/^(https|http):\/\//, '')}
        </a>
    )
}
function isSponsor({ is_sponsor }) {
    return is_sponsor
}
function isNotSponsor({ is_sponsor }) {
    return !is_sponsor
}
const SORTERS = new Map([
    [
        'provider',
        (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
    ],
    ['distance', (a, b) => a.distance - b.distance],
])
