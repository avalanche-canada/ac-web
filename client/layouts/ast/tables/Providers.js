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
import table from 'styles/table.module.css'
import { FormattedMessage, defineMessages } from 'react-intl'
import { useIntlMemo } from 'hooks/intl'

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
                ? Math.max(Math.round(distance(turf.point(provider.loc), place)), MINIMUM_DISTANCE)
                : null,
        }))
    }, [providers, place])
    const [sponsors, others] = useMemo(() => {
        return [all.filter(isSponsor), all.filter(isNotSponsor)]
    }, [all])
    const filtered = useMemo(() => {
        if (tags.size > 0) {
            return others.filter(provider => provider.tags.some(tag => tags.has(tag)))
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
    const columns = useColumns()

    return (
        <Async.Provider value={context}>
            <Layout title={<Title type="provider" count={count} total={providers.length}></Title>}>
                <Responsive>
                    <table>
                        <Header
                            columns={columns}
                            onSortingChange={handleSortingChange}
                            sorting={sorting}
                            place={place}
                        />
                        {sponsors.length > 0 && (
                            <tbody className={table.Featured}>
                                <tr>
                                    <th colSpan={columns.length}>Our sponsors</th>
                                </tr>
                                {renderRows(sponsors, columns)}
                            </tbody>
                        )}
                        <tbody>{renderRows(paginated, columns)}</tbody>
                        <Caption type="provider" empty={count === 0}>
                            <p>
                                <FormattedMessage
                                    description="Layout ast/tables/Providers"
                                    defaultMessage="No providers match your criteria, consider finding a course on the <link>courses page</link>."
                                    values={{
                                        link(text) {
                                            return <Link to="/training/courses">{text}</Link>
                                        },
                                    }}
                                />
                            </p>
                            <p>
                                <FormattedMessage
                                    description="Layout ast/tables/Providers"
                                    defaultMessage="You can also <link>reset your criteria</link> to see them all."
                                    values={{
                                        link(text) {
                                            return <Link to="/training/providers">{text}</Link>
                                        },
                                    }}
                                />
                            </p>
                        </Caption>
                    </table>
                </Responsive>
                <Pagination count={count} page={page} onChange={setPage} />
            </Layout>
        </Async.Provider>
    )
}

function useColumns() {
    const messages = defineMessages({
        distanceDescription: {
            id: 'app.distanceDescription',
            defaultMessage: 'Straight line between {place} and the provider.',
            description: 'Layout ast/tables/Providers',
        },
    })
    return useIntlMemo(intl => [
        {
            name: 'provider',
            title: intl.formatMessage({
                defaultMessage: 'Provider name',
                description: 'Layout ast/tables/Providers',
            }),
            property({ name }) {
                return name
            },
            sorting: NONE,
        },
        {
            name: 'contacts',
            title: intl.formatMessage({
                defaultMessage: 'Contacts',
                description: 'Layout ast/tables/Providers',
            }),
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
                        title={intl.formatMessage(messages.distanceDescription, {
                            place: place.text,
                        })}>
                        <FormattedMessage
                            description="Layout ast/tables/Courses"
                            defaultMessage="Distance"
                        />
                    </Helper>
                ) : (
                    intl.formatMessage({
                        defaultMessage: 'Distance',
                        description: 'Layout ast/tables/Courses',
                    })
                )
            },
            property({ distance }) {
                return <Distance value={distance} />
            },
            sorting: NONE,
        },
        {
            name: 'location',
            title: intl.formatMessage({
                defaultMessage: 'Location',
                description: 'Layout ast/tables/Providers',
            }),
            property({ loc_description }) {
                return loc_description
            },
        },
        {
            name: 'tags',
            title: intl.formatMessage({
                defaultMessage: 'Tags',
                description: 'Layout ast/tables/Providers',
            }),
            property({ tags }) {
                return <Tags value={tags} />
            },
        },
    ])
}

// Utils
function renderRows(providers, columns) {
    return providers.map(row => (
        <tr key={row.id}>
            {columns.map(({ property, name }) => (
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
