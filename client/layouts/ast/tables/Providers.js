import React, { Fragment, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import { Mailto, Phone } from 'components/anchors'
import { List, Term, Definition } from 'components/description'
import { Table, Responsive, TBody, Row, Cell, Caption } from 'components/table'
import Header from './Header'
import Pagination from './Pagination'
import Layout from './Layout'
import { Helper } from 'components/text'
import { useProviders } from 'hooks/async/ast'
import { Distance, Tags } from './cells'
import { NONE, DESC } from 'constants/sortings'
import { Muted } from 'components/text'
import { useSorting, usePagination } from 'hooks/collection'

Providers.propTypes = {
    tags: PropTypes.instanceOf(Set),
    sorting: PropTypes.arrayOf(PropTypes.string),
    place: PropTypes.object,
    onParamsChange: PropTypes.func.isRequired,
}

export default function Providers({ tags, sorting, place, onParamsChange }) {
    // TODO Adds error handling
    const [name, order] = sorting || []
    const [page, setPage] = useState(1)
    const [providers = [], pending] = useProviders()
    const all = useMemo(() => {
        if (place) {
            return providers.map(provider => ({
                ...provider,
                distance: distance(turf.point(provider.loc), place),
            }))
        }

        return providers
    }, [providers, place])
    const [sponsors, others] = useMemo(() => {
        return [all.filter(isSponsor), all.filter(isNotSponsor)]
    }, [all])
    const filtered = useMemo(() => {
        if (tags.size > 0) {
            return others.filter(provider =>
                provider.tags.some(tag => tags.has(tag))
            )
        }

        // FIXME(karl) It is not updating if "others" is returned as is.
        // Needs to figure it out...
        return Array.from(others)
    }, [others, tags])
    const sorted = useSorting(filtered, SORTERS.get(name), order === DESC)
    const paginated = usePagination(sorted, page)

    function handleSortingChange(name, order) {
        onParamsChange({
            sorting: order === NONE ? null : [name, order],
        })
    }

    useEffect(() => {
        setPage(1)
    }, [tags, place, sorting])

    return (
        <Layout title={getTitle(filtered)}>
            <Responsive>
                <Table>
                    <Header
                        columns={COLUMNS}
                        onSortingChange={handleSortingChange}
                        sorting={sorting}
                        place={place}
                    />
                    {sponsors.length > 0 && (
                        <TBody featured title="Our sponsors">
                            {renderRows(sponsors)}
                        </TBody>
                    )}
                    <TBody>{renderRows(paginated)}</TBody>
                    <Caption>
                        {pending ? (
                            <Muted>Loading providers...</Muted>
                        ) : (
                            Array.isArray(filtered) &&
                            renderEmptyMessage(filtered)
                        )}
                    </Caption>
                </Table>
            </Responsive>
            {Array.isArray(filtered) && (
                <Pagination
                    count={filtered.length}
                    page={page}
                    onChange={setPage}
                />
            )}
        </Layout>
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
    return providers.length > 0
        ? `All providers (${providers.length})`
        : 'All providers'
}

const TERM_STYLE = {
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
function isNotSponsor(provider) {
    return !isSponsor(provider)
}
const SORTERS = new Map([
    [
        'provider',
        function sortByName(a, b) {
            return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        },
    ],
    [
        'distance',
        function sortByDistance(a, b) {
            return a.distance - b.distance
        },
    ],
])
