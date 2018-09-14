import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import isSameDay from 'date-fns/is_same_day'
import Container from 'containers/ast/Courses'
import Layout from './Layout'
import Header from './Header'
import Pagination from './Pagination'
import { DateTime, Range } from 'components/time'
import { Phone, Mailto } from 'components/anchors'
import { List, Entry } from 'components/description'
import {
    Table,
    Responsive,
    TBody,
    ExpandableRow,
    Row,
    Cell,
    Caption,
} from 'components/table'
import { Helper } from 'components/text'
import { Markup } from 'components/markup'
import ErrorBoundary from 'components/ErrorBoundary'
import Fetch from 'components/fetch'
import { Paginated, Sorted } from 'components/collection'
import { Error, Muted } from 'components/text'
import { Distance, Tags } from './cells'
import { LEVELS } from '../constants'
import { NONE, DESC } from 'constants/sortings'
import { DATE } from 'utils/date'
import styles from './Courses.css'

export default class Courses extends Component {
    static propTypes = {
        level: PropTypes.oneOf(Array.from(LEVELS.keys())),
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
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
    getTitle(courses) {
        return Array.isArray(courses)
            ? `All courses (${courses.length})`
            : 'All courses'
    }
    componentWillReceiveProps({ level, from, to, tags, sorting }) {
        if (
            this.props.level !== level ||
            this.props.from !== from ||
            this.props.to !== to ||
            this.props.tags !== tags ||
            this.props.sorting !== sorting
        ) {
            this.setState({ page: 1 })
        }
    }
    renderEmptyMessage(courses) {
        return courses.length ? null : (
            <div>
                No courses match your criteria, consider finding a provider on
                the <Link to="/training/providers">providers page</Link> to
                contact directly.
            </div>
        )
    }
    renderRow = row => {
        return (
            <ExpandableRow key={row.id}>
                <Row>
                    {COLUMNS.map(({ property, name }) => (
                        <Cell key={name}>{property(row)}</Cell>
                    ))}
                </Row>
                <Row>
                    <Cell colSpan={COLUMNS.length + 1}>
                        {this.renderControlled(row)}
                    </Cell>
                </Row>
            </ExpandableRow>
        )
    }
    renderControlled({ description, provider }) {
        const { name, website, email, phone, loc_description } = provider

        return (
            <div className={styles.Controlled}>
                <List columns={1} theme="Inline" horizontal>
                    <Entry term="Description">
                        <Markup>{description}</Markup>
                    </Entry>
                </List>
                <List columns={1} horizontal>
                    <Entry term="Name">{name}</Entry>
                    <Entry term="Website">
                        <a href={website} target={name}>
                            {website}
                        </a>
                    </Entry>
                    <Entry term="Email">
                        <Mailto email={email} />
                    </Entry>
                    <Entry term="Phone">
                        <Phone phone={phone} />
                    </Entry>
                    <Entry term="Location">{loc_description}</Entry>
                </List>
            </div>
        )
    }
    renderRows = courses => {
        return courses.map(this.renderRow)
    }
    renderBody = courses => {
        if (courses.length === 0) {
            return null
        }

        const { sorting, place } = this.props
        const { page } = this.state
        const [name, order] = sorting || []

        if (place) {
            courses = courses.map(course => ({
                ...course,
                distance: distance(turf.point(course.loc), place),
            }))
        }

        return (
            <TBody>
                <Sorted
                    values={courses}
                    sorter={SORTERS.get(name)}
                    reverse={order === DESC}>
                    <Paginated page={page}>{this.renderRows}</Paginated>
                </Sorted>
            </TBody>
        )
    }
    renderError() {
        return <Error>An error happened while loading courses.</Error>
    }
    renderPagination = courses => {
        return (
            <Pagination
                count={courses.length}
                page={this.state.page}
                onChange={this.handlePageChange}
            />
        )
    }
    renderContent = ({ courses }) => {
        return (
            <Layout title={this.getTitle(courses)}>
                <Responsive>
                    <Table>
                        <Header
                            columns={COLUMNS}
                            sorting={this.props.sorting}
                            onSortingChange={this.handleSortingChange}
                            place={this.props.place}
                        />
                        {Array.isArray(courses) && this.renderBody(courses)}
                        <Caption>
                            <Fetch.Loading>
                                <Muted>Loading courses...</Muted>
                            </Fetch.Loading>
                            {Array.isArray(courses) &&
                                this.renderEmptyMessage(courses)}
                        </Caption>
                    </Table>
                </Responsive>
                {Array.isArray(courses) && this.renderPagination(courses)}
            </Layout>
        )
    }
    render() {
        const { level, from, to, tags } = this.props

        return (
            <ErrorBoundary fallback={this.renderError}>
                <Container level={level} from={from} to={to} tags={tags}>
                    {this.renderContent}
                </Container>
            </ErrorBoundary>
        )
    }
}

// Utils
const COLUMNS = [
    {
        name: 'dates',
        title: 'Dates',
        property({ date_start, date_end }) {
            if (isSameDay(date_start, date_end)) {
                return <DateTime value={date_start} />
            }

            return <Range format={DATE} from={date_start} to={date_end} />
        },
        sorting: NONE,
    },
    {
        name: 'level',
        title: 'Level',
        property({ level }) {
            return level
        },
    },
    {
        name: 'provider',
        title: 'Provider',
        sorting: NONE,
        property({ provider }) {
            return provider.name
        },
    },
    {
        name: 'distance',
        title({ place }) {
            return place ? (
                <Helper
                    title={`Straight line between ${
                        place.text
                    } and the course.`}>
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
    {
        name: 'cost',
        title: 'Cost',
        property({ cost }) {
            return `${cost.cost} ${cost.currency}`
        },
    },
]
const SORTERS = new Map([
    [
        'provider',
        (a, b) =>
            a.provider.name.localeCompare(b.provider.name, 'en', {
                sensitivity: 'base',
            }),
    ],
    ['distance', (a, b) => a.distance - b.distance],
    ['dates', (a, b) => a.date_start - b.date_start],
])
