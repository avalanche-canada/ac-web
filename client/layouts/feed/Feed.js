import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isBefore from 'date-fns/is_before'
import startOfDay from 'date-fns/start_of_day'
import flatten from 'lodash/flatten'
import { Feed as Container } from 'prismic/containers'
import { Page, Content, Header, Main } from 'components/page'
import { parse, stringify } from 'utils/search'
import { Filtered } from 'components/collection'
import { Status } from 'components/misc'
import { EntrySet, Entry } from 'components/feed'
import { FilterSet, FilterEntry } from 'components/filter'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import { NEWS, BLOG, EVENT } from 'constants/prismic'

function Layout({ title, children }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>{children}</Main>
            </Content>
        </Page>
    )
}

const STYLE = {
    marginTop: '1em',
}

export class Feed extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        filters: PropTypes.object.isRequired,
        children: PropTypes.func,
    }
    static defaultProps = {
        children() {
            return null
        },
    }
    get predicates() {
        const { filters } = this.props
        const predicates = []

        PREDICATES.forEach((predicate, name) => {
            const value = filters[name]

            if (value) {
                if (Array.isArray(value) && value.length === 0) {
                    return
                }

                predicates.push(predicate(filters))
            }
        })

        return predicates
    }
    createMessages({ isLoaded }, { length }) {
        const { type } = this.props
        const isEmpty = isLoaded && length === 0

        return {
            isLoaded: isEmpty && `No ${type} match your criteria.`,
            isLoading: `Loading ${type} feed...`,
            isError: `An error happened while loading the ${type} feed.`,
        }
    }
    children = ({ status, documents }) => [
        this.props.children(documents),
        <div style={STYLE}>
            <Filtered values={documents} predicates={this.predicates}>
                {entries => [
                    <Status
                        {...status}
                        messages={this.createMessages(status, entries)}
                    />,
                    <EntrySet>{entries.map(renderEntry)}</EntrySet>,
                ]}
            </Filtered>
        </div>,
    ]
    render() {
        return <Container type={this.props.type}>{this.children}</Container>
    }
}

NorthRockiesBlogFeed.filters = {
    category: 'north-rockies',
}

export function NorthRockiesBlogFeed() {
    return <Feed type={BLOG} filters={NorthRockiesBlogFeed.filters} />
}

export class BlogFeed extends PureComponent {
    constructor(props) {
        super(props)

        const { year, month, category } = parse(props.location.search)

        this.state = {
            year: year && Number(year),
            month,
            category,
        }
    }
    handleYearChange = year => this.setState({ year }, serialize)
    handleMonthChange = month => this.setState({ month }, serialize)
    handleCategoryChange = category => this.setState({ category }, serialize)
    children = documents => {
        const { category, year, month } = this.state
        const categoryOptions = computeOptions(
            'category',
            documents,
            new Map([[undefined, 'All categories']])
        )

        return (
            <FilterSet>
                <FilterEntry>
                    <Dropdown
                        value={category}
                        onChange={this.handleCategoryChange}
                        options={categoryOptions}
                        placeholder={categoryOptions.get()}
                    />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown
                        value={year}
                        onChange={this.handleYearChange}
                        options={YearOptions}
                        placeholder={YearOptions.get()}
                    />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown
                        value={month}
                        onChange={this.handleMonthChange}
                        options={MonthsOptions}
                        placeholder={MonthsOptions.get()}
                    />
                </FilterEntry>
            </FilterSet>
        )
    }
    render() {
        return (
            <Layout title="Blogs">
                <Feed type={BLOG} filters={this.state}>
                    {this.children}
                </Feed>
            </Layout>
        )
    }
}

export class NewsFeed extends PureComponent {
    constructor(props) {
        super(props)

        const { month, year, tags } = parse(props.location.search)

        this.state = {
            year: year && Number(year),
            month,
            tags: sanitizeTags(tags),
        }
    }
    handleYearChange = year => this.setState({ year }, serialize)
    handleMonthChange = month => this.setState({ month }, serialize)
    handleTagChange = tags =>
        this.setState({ tags: Array.from(tags) }, serialize)
    children = documents => {
        const { year, month, tags } = this.state
        const tagOptions = computeOptions('tags', documents, new Map())

        return (
            <FilterSet>
                <FilterEntry>
                    <Dropdown
                        value={year}
                        onChange={this.handleYearChange}
                        options={YearOptions}
                        placeholder={YearOptions.get()}
                    />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown
                        value={month}
                        onChange={this.handleMonthChange}
                        options={MonthsOptions}
                        placeholder={MonthsOptions.get()}
                    />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown
                        value={new Set(tags)}
                        onChange={this.handleTagChange}
                        options={tagOptions}
                        placeholder="All tags"
                    />
                </FilterEntry>
            </FilterSet>
        )
    }
    render() {
        return (
            <Layout title="Recent news">
                <Feed type={NEWS} filters={this.state}>
                    {this.children}
                </Feed>
            </Layout>
        )
    }
}

export class EventFeed extends PureComponent {
    constructor(props) {
        super(props)

        const { timeline, tags } = parse(props.location.search)

        this.state = {
            timeline: timeline === PAST ? PAST : UPCOMING,
            tags: sanitizeTags(tags),
        }
    }
    handleTimelineChange = timeline => this.setState({ timeline }, serialize)
    handleTagChange = tags =>
        this.setState({ tags: Array.from(tags) }, serialize)
    componentWillMount() {
        if (!this.props.location.search) {
            this.props.history.replace({
                ...this.props.location,
                search: stringify({
                    timeline: UPCOMING,
                }),
            })
        }
    }
    children = documents => {
        const { timeline, tags } = this.state
        const tagOptions = computeOptions('tags', documents, new Map())

        return (
            <FilterSet>
                <FilterEntry>
                    <Dropdown
                        value={timeline}
                        onChange={this.handleTimelineChange}
                        options={TimelineOptions}
                        placeholder={TimelineOptions.get()}
                    />
                </FilterEntry>
                <FilterEntry>
                    <Dropdown
                        value={new Set(tags)}
                        onChange={this.handleTagChange}
                        options={tagOptions}
                        placeholder="All tags"
                    />
                </FilterEntry>
            </FilterSet>
        )
    }
    render() {
        return (
            <Layout title="Events">
                <Feed type={EVENT} filters={this.state}>
                    {this.children}
                </Feed>
            </Layout>
        )
    }
}

// utils
function renderEntry(post) {
    return <Entry key={post.uid} {...post} />
}
function optionReducer(map, value) {
    value = value.trim()

    return map.set(value.toLowerCase(), value)
}
function flattenReducer(values, value) {
    return flatten([values, value])
}
function computeOptions(property, feed = [], initial) {
    function pluck(post) {
        return post[property]
    }
    const values = feed
        .map(pluck)
        .filter(Boolean)
        .reduce(flattenReducer, [])

    return Array.from(new Set(values))
        .sort()
        .reduce(optionReducer, initial)
}

const YEAR = new Date().getFullYear()

const YearOptions = new Map([
    [undefined, 'All years'],
    ...Array(YEAR - 2012)
        .fill(YEAR)
        .map((value, index) => value - index)
        .map(year => [year, String(year)]),
])

const MonthsOptions = new Map([
    [undefined, 'All Months'],
    ['january', 'January'],
    ['february', 'February'],
    ['march', 'March'],
    ['april', 'April'],
    ['may', 'May'],
    ['june', 'June'],
    ['july', 'July'],
    ['august', 'August'],
    ['september', 'September'],
    ['october', 'October'],
    ['november', 'November'],
    ['december', 'December'],
])

const PAST = 'past'
const UPCOMING = 'upcoming'
const TimelineOptions = new Map([
    [UPCOMING, 'Upcoming events'],
    [PAST, 'Past events'],
])
const MONTHS = Array.from(MonthsOptions.keys()).filter(Boolean)
const PREDICATES = new Map([
    ['year', ({ year }) => post => post.year == year], // == works with strings and numbers
    ['month', ({ month }) => post => post.month === MONTHS.indexOf(month)],
    ['category', ({ category }) => post => post.category == category],
    [
        'tags',
        ({ tags }) => post =>
            Boolean(post.tags.find(tag => tags.includes(tag))),
    ],
    [
        'timeline',
        ({ timeline }) => post => {
            const isPast = isBefore(post.endDate, startOfDay(new Date()))

            return timeline === 'past' ? isPast : !isPast
        },
    ],
])
function serialize() {
    this.props.history.push({
        search: stringify(this.state),
    })
}
function sanitizeTags(tags) {
    return typeof tags === 'string' && tags.length > 0 ? [tags] : tags
}
