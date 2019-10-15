import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import isSameDay from 'date-fns/is_same_day'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
import addDays from 'date-fns/add_days'
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
import { MultiLine } from 'components/misc'
import ErrorBoundary from 'components/ErrorBoundary'
import { Error, Muted } from 'components/text'
import Shim from 'components/Shim'
import { Distance, Tags } from './cells'
import { LEVELS, MINIMUM_DISTANCE } from '../constants'
import { NONE, DESC } from 'constants/sortings'
import { DATE } from 'utils/date'
import styles from './Courses.css'
import { useCourses } from 'hooks/ast'
import {
    useSorting,
    usePagination,
    useFilters,
} from 'hooks/collection'

Courses.propTypes = {
    level: PropTypes.oneOf(Array.from(LEVELS.keys())),
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
    tags: PropTypes.instanceOf(Set),
    sorting: PropTypes.arrayOf(PropTypes.string),
    place: PropTypes.object,
    onParamsChange: PropTypes.func.isRequired,
}

export default function Courses({
    level,
    from,
    to,
    tags,
    sorting,
    place,
    onParamsChange,
}) {
    const fallback = <Error>An error happened while loading courses.</Error>
    const [name, order] = sorting || ['dates'] // If no sorting defined, sorting is done on 'dates' by default
    const [courses = [], pending] = useCourses()
    const [page, setPage] = useState(1)
    const all = useMemo(() => {
        if (place) {
            return courses.map(course => ({
                ...course,
                distance: Math.max(
                    Math.round(distance(turf.point(course.loc), place)),
                    MINIMUM_DISTANCE
                ),
            }))
        }

        // FIXME(karl) It is not updating if "others" is returned as is.
        // Needs to figure it out...
        return Array.from(courses)
    }, [courses, place])
    const sorted = useSorting(all, SORTERS.get(name), order === DESC)
    const filtered = useFilters(
        sorted,
        getPredicates({ level, from, to, tags })
    )
    const paginated = usePagination(filtered, page)

    function handleSortingChange(name, order) {
        onParamsChange({
            sorting: order === NONE ? null : [name, order],
        })
    }

    useEffect(() => {
        setPage(1)
    }, [level, from, to, tags, sorting])

    return (
        <ErrorBoundary fallback={fallback}>
            <Layout title={getTitle(filtered)}>
                <Responsive>
                    <Table>
                        <Header
                            columns={COLUMNS}
                            sorting={sorting}
                            onSortingChange={handleSortingChange}
                            place={place}
                        />
                        <TBody>{paginated.map(renderRow)}</TBody>
                        <Caption>
                            {pending ? (
                                <Muted>Loading courses...</Muted>
                            ) : (
                                renderEmptyMessage(filtered)
                            )}
                        </Caption>
                    </Table>
                </Responsive>
                {filtered.length > 0 && (
                    <Pagination
                        count={filtered.length}
                        page={page}
                        onChange={setPage}
                    />
                )}
            </Layout>
        </ErrorBoundary>
    )
}

// Utils
function getTitle(courses) {
    return courses.length > 0
        ? `All courses (${courses.length})`
        : 'All courses'
}
function renderEmptyMessage(courses) {
    return courses.length ? null : (
        <div>
            No courses match your criteria, consider finding a provider on the{' '}
            <Link to="/training/providers">providers page</Link> to contact
            directly.
        </div>
    )
}
function renderRow(row) {
    return (
        <ExpandableRow key={row.id}>
            <Row>
                {COLUMNS.map(({ property, name }) => (
                    <Cell key={name}>{property(row)}</Cell>
                ))}
            </Row>
            <Row>
                <Cell colSpan={COLUMNS.length + 1}>
                    {renderControlled(row)}
                </Cell>
            </Row>
        </ExpandableRow>
    )
}
function renderControlled({ description, provider }) {
    const { name, website, email, phone, loc_description } = provider

    return (
        <div className={styles.Controlled}>
            <Shim right>
                <List inline>
                    <Entry term="Description">
                        <MultiLine>{description}</MultiLine>
                    </Entry>
                </List>
            </Shim>
            <List>
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
    ['provider', (a, b) => sortByName(a, b) || sortByDate(a, b)],
    [
        'distance',
        (a, b) => sortByDistance(a, b) || sortByDate(a, b) || sortByName(a, b),
    ],
    ['dates', (a, b) => sortByDate(a, b) || sortByName(a, b)],
])
function sortByDate(a, b) {
    return new Date(a.date_start) - new Date(b.date_start)
}
function sortByDistance(a, b) {
    return a.distance - b.distance
}
function sortByName(a, b) {
    return a.provider.name.localeCompare(b.provider.name, 'en', {
        sensitivity: 'base',
    })
}
const PREDICATES = new Map([
    ['level', ({ level }) => course => course.level === level],
    [
        'tags',
        ({ tags = new Set() }) => course =>
            tags.size === 0 ? true : course.tags.some(tag => tags.has(tag)),
    ],
    [
        'to',
        ({ from, to }) => ({ date_start, date_end }) =>
            areRangesOverlapping(from, addDays(to, 1), date_start, date_end),
    ],
])
function getPredicates(props) {
    return Object.entries(props).reduce((filters, [key, value]) => {
        if (value && PREDICATES.has(key)) {
            const predicate = PREDICATES.get(key)

            filters.push(predicate(props))
        }

        return filters
    }, [])
}
