import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import distance from '@turf/distance'
import * as turf from '@turf/helpers'
import isSameDay from 'date-fns/is_same_day'
import areRangesOverlapping from 'date-fns/are_ranges_overlapping'
import addDays from 'date-fns/add_days'
import { Layout, Header, Title, Caption, Pagination } from './utils'
import { DateTime, Range } from 'components/time'
import { Phone, Mailto } from 'components/anchors'
import { List, Entry } from 'components/description'
import { Responsive, ExpandableRow } from 'components/table'
import { Helper } from 'components/text'
import { MultiLine } from 'components/misc'
import Shim from 'components/Shim'
import { Distance, Tags } from './cells'
import { LEVELS, MINIMUM_DISTANCE } from '../constants'
import { NONE, DESC, ASC } from 'constants/sortings'
import { DATE } from 'utils/date'
import { useCourses } from 'hooks/async/ast'
import { useSorting, usePagination, useFilters } from 'hooks/collection'
import * as Async from 'contexts/async'
import styles from './Courses.css'

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
    const [name = null, order = NONE] = sorting
    const context = useCourses()
    const [courses = []] = context
    const [page, setPage] = useState(1)
    const all = useMemo(() => {
        return courses.map(course => ({
            ...course,
            distance: place
                ? Math.max(
                      Math.round(distance(turf.point(course.loc), place)),
                      MINIMUM_DISTANCE
                  )
                : null,
        }))
    }, [courses, place])
    const sorted = useSorting(all, SORTERS.get(order).get(name))
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

    const count = filtered.length

    return (
        <Async.Provider value={context}>
            <Layout
                title={
                    <Title
                        type="courses"
                        count={count}
                        total={courses.length}
                    />
                }>
                <Responsive>
                    <table>
                        <Header
                            columns={COLUMNS}
                            sorting={sorting}
                            onSortingChange={handleSortingChange}
                            place={place}
                        />
                        <tbody>{paginated.map(renderRow)}</tbody>
                        <Caption type="courses" empty={count === 0}>
                            <p>
                                No courses match your criteria, consider finding
                                a provider on the{' '}
                                <Link to="/training/providers">
                                    providers page
                                </Link>{' '}
                                to contact directly.
                            </p>
                            <p>
                                You can also{' '}
                                <Link to="/training/courses">
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

// Utils
function renderRow(row) {
    return (
        <ExpandableRow key={row.id}>
            <tr>
                {COLUMNS.map(({ property, name }) => (
                    <td key={name}>{property(row)}</td>
                ))}
            </tr>
            <tr>
                <td colSpan={COLUMNS.length + 1}>{renderControlled(row)}</td>
            </tr>
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
                    title={`Straight line between ${place.text} and the course.`}>
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
            return (
                <span className={styles.CostCell}>
                    {cost.cost} {cost.currency}
                </span>
            )
        },
    },
]
const SORTERS = new Map([
    [
        ASC,
        new Map([
            ['provider', (a, b) => sortByName(a, b) || sortByDate(a, b)],
            [
                'distance',
                (a, b) =>
                    sortByDistance(a, b) ||
                    sortByDate(a, b) ||
                    sortByName(a, b),
            ],
            ['dates', (a, b) => sortByDate(a, b) || sortByName(a, b)],
        ]),
    ],
    [
        DESC,
        new Map([
            ['provider', (a, b) => sortByName(b, a) || sortByDate(a, b)],
            [
                'distance',
                (a, b) =>
                    sortByDistance(b, a) ||
                    sortByDate(a, b) ||
                    sortByName(a, b),
            ],
            ['dates', (a, b) => sortByDate(b, a) || sortByName(a, b)],
        ]),
    ],
    [NONE, new Map()],
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
