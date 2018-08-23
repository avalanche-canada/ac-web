import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Url from 'url'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import { Mailto, Phone } from 'components/anchors'
import { List, Term, Definition } from 'components/description'
import { Table, Responsive, TBody, Row, Cell, Caption } from 'components/table'
import Header from './Header'
import Pagination from './Pagination'
import Layout from './Layout'
import { Status } from 'components/misc'
import { Helper } from 'components/text'
import { Paginated, Sorted } from 'components/collection'
import Container from 'containers/ast/Providers'
import { NONE, DESC } from 'constants/sortings'
import { MINIMUM_DISTANCE } from '../constants'

export default class Providers extends PureComponent {
    static propTypes = {
        tags: PropTypes.instanceOf(Set),
        sorting: PropTypes.arrayOf(PropTypes.string),
        place: PropTypes.object,
        onParamsChange: PropTypes.func.isRequired,
    }
    state = {
        page: 1,
    }
    handleSortingChange = (name, order) => {
        this.props.onParamsChange({
            sorting: order === NONE ? null : [name, order],
        })
    }
    handlePageChange = page => {
        this.setState({ page })
    }
    componentWillReceiveProps({ tags, place, sorting }) {
        if (
            this.props.tags !== tags ||
            this.props.place !== place ||
            this.props.sorting !== sorting
        ) {
            this.setState({ page: 1 })
        }
    }
    getTitle({ status, providers }) {
        if (status.isLoaded) {
            return `All providers (${providers.size})`
        } else {
            return 'All providers'
        }
    }
    createMessages({ providers, status }) {
        return {
            ...status.messages,
            isLoaded:
                status.isLoaded && providers.isEmpty() ? (
                    <div>
                        No providers match your criteria, consider finding a
                        course on the{' '}
                        <Link to="/training/courses">courses page</Link>.
                    </div>
                ) : (
                    status.messages.isLoaded
                ),
        }
    }
    renderRow = row => {
        return (
            <Row key={row.get('id')}>
                {COLUMNS.map(({ property, name }) => (
                    <Cell key={name}>{property(row)}</Cell>
                ))}
            </Row>
        )
    }
    renderRows(providers) {
        return providers.toList().map(this.renderRow)
    }
    renderFeatured(providers) {
        return (
            <TBody featured title="Our sponsors">
                {this.renderRows(providers.filter(isFeatured))}
            </TBody>
        )
    }
    renderBody(providers) {
        const rows = providers.filterNot(isFeatured)
        const { page } = this.state
        const [name, order] = this.props.sorting || []

        return (
            <TBody>
                <Sorted
                    values={rows}
                    sorter={SORTERS.get(name)}
                    reverse={order === DESC}>
                    <Paginated page={page}>
                        {rows => this.renderRows(rows)}
                    </Paginated>
                </Sorted>
            </TBody>
        )
    }
    renderBodies({ providers }) {
        if (providers.isEmpty()) {
            return null
        }

        const { place } = this.props

        if (place) {
            providers = providers.map(provider =>
                provider.set(
                    'distance',
                    Math.max(
                        distance(
                            turf.point(provider.get('loc').toArray()),
                            place
                        ),
                        MINIMUM_DISTANCE
                    )
                )
            )
        }

        return (
            <Fragment>
                {this.renderFeatured(providers)}
                {this.renderBody(providers)}
            </Fragment>
        )
    }
    renderChildren({ props }) {
        return (
            <Layout title={this.getTitle(props)}>
                <Responsive>
                    <Table>
                        <Header
                            columns={COLUMNS}
                            onSortingChange={this.handleSortingChange}
                            sorting={this.props.sorting}
                            place={this.props.place}
                        />
                        {this.renderBodies(props)}
                        <Caption>
                            <Status
                                {...props.status}
                                messages={this.createMessages(props)}
                            />
                        </Caption>
                    </Table>
                </Responsive>
                <Pagination
                    count={props.providers.size}
                    page={this.state.page}
                    onChange={this.handlePageChange}
                />
            </Layout>
        )
    }
    render() {
        return (
            <Container tags={this.props.tags}>
                {data => this.renderChildren(data)}
            </Container>
        )
    }
}

const COLUMNS = [
    {
        name: 'provider',
        title: 'Provider name',
        property(provider) {
            return provider.get('name')
        },
        sorting: NONE,
    },
    {
        name: 'contacts',
        title: 'Contacts',
        property(provider) {
            return (
                <List>
                    {provider.has('email') && (
                        <Entry term="Email">
                            <Mailto email={provider.get('email')} />
                        </Entry>
                    )}
                    {provider.has('phone') && (
                        <Entry term="Phone">
                            <Phone phone={provider.get('phone')} />
                        </Entry>
                    )}
                    {provider.has('website') && (
                        <Entry term="Website">
                            <Anchor href={provider.get('website')} />
                        </Entry>
                    )}
                </List>
            )
        },
    },
    {
        name: 'distance',
        title({ place }) {
            if (place) {
                return (
                    <Helper
                        title={`Straight line between ${
                            place.text
                        } and the provider.`}>
                        Distance
                    </Helper>
                )
            }

            return 'Distance'
        },
        property(provider) {
            const distance = provider.get('distance')

            if (typeof distance === 'number') {
                return distance <= MINIMUM_DISTANCE
                    ? `< ${MINIMUM_DISTANCE} km`
                    : `${Math.ceil(distance)} km`
            }

            return 'N/A'
        },
        sorting: NONE,
    },
    {
        name: 'location',
        title: 'Location',
        property(provider) {
            return provider.get('locDescription')
        },
    },
    {
        name: 'tags',
        title: 'Tags',
        property(provider) {
            return provider
                .get('tags')
                .sort()
                .join(', ')
        },
    },
]

// Utils
const TERM_STYLE = {
    flex: '0 1 35%',
}
function Entry({ term, children }) {
    return (
        <Fragment>
            <Term style={TERM_STYLE}>{term}</Term>
            <Definition>{children}</Definition>
        </Fragment>
    )
}
function Anchor({ href }) {
    let { hostname, path } = Url.parse(href)

    path = (typeof path === 'string' && path.replace(/\//, '')) || null

    return (
        <a href={href} title={href} target="_blank">
            {path ? `${hostname}/…` : hostname}
        </a>
    )
}
function isFeatured(row) {
    return row.get('isFeatured')
}
const SORTERS = new Map([
    [
        'provider',
        (a, b) =>
            a
                .get('name')
                .localeCompare(b.get('name'), 'en', { sensitivity: 'base' }),
    ],
    ['distance', (a, b) => a.get('distance') - b.get('distance')],
])
