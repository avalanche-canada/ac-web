import React, { Component } from 'react'
import flatten from 'lodash/flatten'
import * as Containers from 'prismic/containers'
import { Page, Content, Header, Main } from 'components/page'
import { parse, stringify } from 'utils/search'
import { Status } from 'components/misc'
import Shim from 'components/Shim'
import Pagination from 'components/pagination'
import { EntrySet, Entry } from 'components/feed'
import { FilterSet, FilterEntry } from 'components/filter'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import { NEWS, EVENT } from 'constants/prismic'

function FeedLayout({ title, children }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>{children}</Main>
            </Content>
        </Page>
    )
}

function FeedContent({ status, documents, metadata, onPageChange }) {
    return (
        <Shim vertical>
            <Status {...status} />
            <EntrySet>{documents.map(renderEntry)}</EntrySet>
            <Pagination
                active={metadata.page}
                onChange={onPageChange}
                total={metadata.totalPages}
            />
        </Shim>
    )
}

export class NorthRockiesBlogFeed extends Component {
    state = {
        page: 1,
    }
    handlePageChange = page => this.setState({ page })
    renderContent = renderContent.bind(this)
    render() {
        const { page } = this.state

        return (
            <Containers.BlogPostFeed category="north-rockies" page={page}>
                {this.renderContent}
            </Containers.BlogPostFeed>
        )
    }
}

export class BlogPostFeed extends Component {
    static getDerivedStateFromProps({ location }) {
        const { year, month, category, page } = parse(location.search)

        return {
            page: page && Number(page),
            year: year && Number(year),
            month,
            category,
        }
    }
    handleYearChange = handleYearChange.bind(this)
    handleMonthChange = handleMonthChange.bind(this)
    handleCategoryChange = handleCategoryChange.bind(this)
    handlePageChange = handlePageChange.bind(this)
    renderContent = renderContent.bind(this)
    render() {
        const { category, year, month } = this.state

        return (
            <FeedLayout title="Blogs">
                <FilterSet>
                    <FilterEntry>
                        <Dropdown
                            value={category}
                            onChange={this.handleCategoryChange}
                            options={CategoryOptions}
                            placeholder={CategoryOptions.get()}
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
                <Containers.BlogPostFeed {...this.state}>
                    {this.renderContent}
                </Containers.BlogPostFeed>
            </FeedLayout>
        )
    }
}

export class NewsFeed extends Component {
    static getDerivedStateFromProps({ location }) {
        const { month, year, tags, page } = parse(location.search)

        return {
            page: page ? Number(page) : 1,
            year: year && Number(year),
            month,
            tags: new Set(sanitizeTags(tags)),
        }
    }
    handleYearChange = handleYearChange.bind(this)
    handleMonthChange = handleMonthChange.bind(this)
    handleTagChange = handleTagChange.bind(this)
    handlePageChange = handlePageChange.bind(this)
    renderContent = renderContent.bind(this)
    render() {
        const { year, month, tags } = this.state

        return (
            <FeedLayout title="Recent news">
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
                        <Containers.Tags type={NEWS}>
                            {all => (
                                <Dropdown
                                    value={tags}
                                    onChange={this.handleTagChange}
                                    options={convertTagsToOptions(all)}
                                    placeholder="All tags"
                                />
                            )}
                        </Containers.Tags>
                    </FilterEntry>
                </FilterSet>
                <Containers.NewsFeed {...this.state}>
                    {this.renderContent}
                </Containers.NewsFeed>
            </FeedLayout>
        )
    }
}

export class EventFeed extends Component {
    static getDerivedStateFromProps({ location }) {
        const { timeline, tags } = parse(location.search)

        return {
            timeline: timeline === PAST ? PAST : UPCOMING,
            tags: new Set(sanitizeTags(tags)),
        }
    }
    handleTimelineChange = handleTimelineChange.bind(this)
    handleTagChange = handleTagChange.bind(this)
    handlePageChange = handlePageChange.bind(this)
    renderContent = renderContent.bind(this)
    render() {
        const { timeline, tags } = this.state

        return (
            <FeedLayout title="Events">
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
                        <Containers.Tags type={EVENT}>
                            {all => (
                                <Dropdown
                                    value={new Set(tags)}
                                    onChange={this.handleTagChange}
                                    options={convertTagsToOptions(all)}
                                    placeholder="All tags"
                                />
                            )}
                        </Containers.Tags>
                    </FilterEntry>
                </FilterSet>
                <Containers.EventFeed tags={tags} past={timeline === PAST}>
                    {this.renderContent}
                </Containers.EventFeed>
            </FeedLayout>
        )
    }
}

// Utils
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

const CURRENT_YEAR = new Date().getFullYear()

const YearOptions = new Map([
    [undefined, 'All years'],
    ...Array(CURRENT_YEAR - 2012)
        .fill(CURRENT_YEAR)
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
const CategoryOptions = new Map([
    ['forecaster blog', 'Forecaster blog'],
    ['north-rockies', 'North Rockies'],
    ['south-rockies', 'South Rockies'],
    ['yukon', 'Yukon'],
    [undefined, 'All categories'],
])
function serialize() {
    const { page } = this.state

    this.props.history.push({
        search: stringify({
            ...this.state,
            page: page > 1 ? page : undefined,
        }),
    })
}
function sanitizeTags(tags) {
    return typeof tags === 'string' && tags.length > 0 ? [tags] : tags
}
function handleYearChange(year) {
    this.setState({ year, page: 1 }, serialize)
}
function handleMonthChange(month) {
    this.setState({ month, page: 1 }, serialize)
}
function handleCategoryChange(category) {
    this.setState({ category, page: 1 }, serialize)
}
function handlePageChange(page) {
    this.setState({ page }, serialize)
}
function handleTagChange(tags) {
    this.setState({ tags, page: 1 }, serialize)
}
function handleTimelineChange(timeline) {
    this.setState({ timeline, page: 1 }, serialize)
}
function renderContent(data) {
    return <FeedContent {...data} onPageChange={this.handlePageChange} />
}
function convertTagsToOptions(tags) {
    return new Map(
        Array.from(tags)
            .sort()
            .map(tag => [tag, tag])
    )
}
