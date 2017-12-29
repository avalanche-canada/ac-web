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
import { Status } from 'components/misc'
import { Helper } from 'components/text'
import { Markup } from 'components/markup'
import { Paginated, Sorted } from 'components/collection'
import { LEVELS, MINIMUM_DISTANCE } from '../constants'
import { NONE, DESC } from 'constants/sortings'
import { DATE } from 'utils/date'
import styles from './Courses.css'

export default class Courses extends Component {
    static propTypes = {
        level: PropTypes.oneOf(Array.from(LEVELS.keys())),
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date),
        tags: PropTypes.instanceOf(Set),
        sorting: PropTypes.array,
        place: PropTypes.object,
        onParamChange: PropTypes.func.isRequired,
    }
    state = {
        page: 1,
        sorting: this.props.sorting,
    }
    handleParamChange = () => {
        this.props.onParamChange({
            sorting: this.state.sorting,
        })
    }
    handleSortingChange = (name, order) => {
        const sorting = order === NONE ? null : [name, order]

        this.setState({ sorting }, this.handleParamChange)
    }
    handlePageChange = page => {
        this.setState({ page })
    }
    getTitle({ status, courses }) {
        if (status.isLoaded) {
            return `All courses (${courses.size})`
        } else {
            return 'All courses'
        }
    }
    componentWillReceiveProps({ level, from, to, tags }, { sorting }) {
        if (
            this.props.level !== level ||
            this.props.from !== from ||
            this.props.to !== to ||
            this.props.tags !== tags ||
            this.state.sorting !== sorting
        ) {
            this.setState({ page: 1 })
        }
    }
    createMessages({ courses, status }) {
        return {
            ...status.messages,
            isLoaded:
                status.isLoaded && courses.isEmpty() ? (
                    <div>
                        No courses match your criteria, consider finding a
                        provider on the{' '}
                        <Link to="/training/providers">providers page</Link> to
                        contact directly.
                    </div>
                ) : (
                    status.messages.isLoaded
                ),
        }
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
    renderControlled(course) {
        const name = course.getIn(['provider', 'name'])
        const website = course.getIn(['provider', 'website'])

        return (
            <div className={styles.Controlled}>
                <List columns={1} theme="Inline" horizontal>
                    <Entry term="Description">
                        <Markup>{course.get('description')}</Markup>
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
                        <Mailto email={course.getIn(['provider', 'email'])} />
                    </Entry>
                    <Entry term="Phone">
                        <Phone phone={course.getIn(['provider', 'phone'])} />
                    </Entry>
                    <Entry term="Location">
                        {course.getIn(['provider', 'locDescription'])}
                    </Entry>
                </List>
            </div>
        )
    }
    renderRows = courses => {
        return courses.toList().map(this.renderRow)
    }
    renderBody({ courses }) {
        if (courses.isEmpty()) {
            return null
        }

        const { place } = this.props
        const { sorting, page } = this.state
        const [name, order] = sorting || []

        if (place) {
            courses = courses.map(course =>
                course.set(
                    'distance',
                    Math.max(
                        distance(
                            turf.point(course.get('loc').toArray()),
                            place
                        ),
                        MINIMUM_DISTANCE
                    )
                )
            )
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
    renderChildren({ props }) {
        return (
            <Layout title={this.getTitle(props)}>
                <Responsive>
                    <Table>
                        <Header
                            columns={COLUMNS}
                            sorting={this.state.sorting}
                            onSortingChange={this.handleSortingChange}
                            place={this.props.place}
                        />
                        {this.renderBody(props)}
                        <Caption>
                            <Status
                                {...props.status}
                                messages={this.createMessages(props)}
                            />
                        </Caption>
                    </Table>
                </Responsive>
                <Pagination
                    count={props.courses.size}
                    page={this.state.page}
                    onChange={this.handlePageChange}
                />
            </Layout>
        )
    }
    render() {
        const { level, from, to, tags } = this.props

        return (
            <Container level={level} from={from} to={to} tags={tags}>
                {data => this.renderChildren(data)}
            </Container>
        )
    }
}

// Utils
const COLUMNS = [
    {
        name: 'dates',
        title: 'Dates',
        property(course) {
            const dateStart = course.get('dateStart')
            const dateEnd = course.get('dateEnd')

            if (isSameDay(dateStart, dateEnd)) {
                return <DateTime value={dateStart} />
            }

            return <Range format={DATE} from={dateStart} to={dateEnd} />
        },
        sorting: NONE,
    },
    {
        name: 'level',
        title: 'Level',
        property(course) {
            return course.get('level')
        },
    },
    {
        name: 'provider',
        title: 'Provider',
        sorting: NONE,
        property(course) {
            return course.getIn(['provider', 'name'])
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
                        } and the course.`}>
                        Distance
                    </Helper>
                )
            }

            return 'Distance'
        },
        property(course) {
            const distance = course.get('distance')

            if (typeof distance === 'number') {
                if (distance <= MINIMUM_DISTANCE) {
                    return `< ${MINIMUM_DISTANCE} km`
                } else {
                    return `${Math.ceil(distance)} km`
                }
            }

            return 'N/A'
        },
        sorting: NONE,
    },
    {
        name: 'location',
        title: 'Location',
        property(course) {
            return course.get('locDescription')
        },
    },
    {
        name: 'tags',
        title: 'Tags',
        property(course) {
            return course
                .get('tags')
                .sort()
                .join(', ')
        },
    },
    {
        name: 'cost',
        title: 'Cost',
        property(course) {
            const { cost, currency } = course.get('cost').toObject()

            return `${cost} ${currency}`
        },
    },
]
const SORTERS = new Map([
    [
        'provider',
        (a, b) =>
            a
                .getIn(['provider', 'name'])
                .localeCompare(b.getIn(['provider', 'name'])),
    ],
    ['distance', (a, b) => a.get('distance') < b.get('distance')],
    ['dates', (a, b) => a.get('dateStart') < b.get('dateStart')],
])