import React, { Fragment, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import { Mailto, Phone } from 'components/anchors'
import { List, Term, Definition } from 'components/description'
import { Responsive } from 'components/table'
import { MINIMUM_DISTANCE } from '../constants'
import { Layout, Header, Title, Caption, Pagination } from './utils'
import { Helper } from 'components/text'
import { useProviders } from 'hooks/async/ast'
import { Distance, Tags } from './cells'
import { NONE, DESC } from 'constants/sortings'
import { useSorting, usePagination } from 'hooks/collection'
import * as Async from 'contexts/async'
import table from 'styles/table.css'

Providers.propTypes = {
    tags: PropTypes.instanceOf(Set),
    sorting: PropTypes.arrayOf(PropTypes.string),
    place: PropTypes.object,
    onParamsChange: PropTypes.func.isRequired,
}

export default function Providers({ tags, sorting, place, onParamsChange }) {
    const [name, order] = sorting || []
    const [page, setPage] = useState(1)
    const context = useProviders()
    const [providers = []] = context
    const all = useMemo(() => {
        return providers.map(provider => ({
            ...provider,
            distance: place
                ? Math.max(
                      Math.round(distance(turf.point(provider.loc), place)),
                      MINIMUM_DISTANCE
                  )
                : null,
        }))
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

        return others
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

    const count = filtered.length + sponsors.length

    return (
        <Async.Provider value={context}>
            <Layout
                title={
                    <Title
                        type="providers"
                        count={count}
                        total={providers.length}></Title>
                }>
                <Responsive>
                    <table>
                        <Header
                            columns={COLUMNS}
                            onSortingChange={handleSortingChange}
                            sorting={sorting}
                            place={place}
                        />
                        {sponsors.length > 0 && (
                            <tbody
                                data-title="Our sponsors"
                                className={table.Featured}>
                                {renderRows(sponsors)}
                            </tbody>
                        )}
                        <tbody>{renderRows(paginated)}</tbody>
                        <Caption type="providers" empty={count === 0}>
                            <p>
                                No providers match your criteria, consider
                                finding a course on the{' '}
                                <Link to="/training/courses">courses page</Link>
                                .
                            </p>
                            <p>
                                You can also{' '}
                                <Link to="/training/providers">
                                    reset your criteria
                                </Link>{' '}
                                to see them all.
                            </p>
                        </Caption>
                    </table>
                </Responsive>
                <Pagination count={count} page={page} onChange={setPage} />
            </Layout>
        </Async.Provider>
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
                    title={`Straight line between ${place.text} and the provider.`}>
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
function renderRows(providers) {
    return providers.map(row => (
        <tr key={row.id}>
            {COLUMNS.map(({ property, name }) => (
                <td key={name}>{property(row)}</td>
            ))}
        </tr>
    ))
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
