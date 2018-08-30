import React, { Component } from 'react'
import { Documents, Tags } from 'prismic/containers'
import { feed } from 'prismic/params'
import { Page, Content, Header, Main } from 'components/page'
import { parse, stringify } from 'utils/search'
import { Loading, Muted } from 'components/text'
import Shim from 'components/Shim'
import Pagination from 'components/pagination'
import ScrollToTop from 'components/ScrollToTop'
import { EntrySet, Entry } from 'components/feed'
import { FilterSet, FilterEntry } from 'components/filter'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import { NEWS, EVENT, BLOG } from 'constants/prismic'

export class NorthRockiesBlogFeed extends Component {
    state = {
        page: 1,
    }
    handlePageChange = page => this.setState({ page })
    renderContent = renderContent.bind(this, BLOG)
    render() {
        const { page } = this.state
        const category = 'north-rockies'

        return (
            <Documents {...feed.blog({ category, page })}>
                {this.renderContent}
            </Documents>
        )
    }
}

export class BlogPostFeed extends Component {
    constructor(props) {
        super(props)

        const { year, month, category, page } = parse(props.location.search)

        this.state = {
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
    renderContent = renderContent.bind(this, BLOG)
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
                <Documents {...feed.blog(this.state)}>
                    {this.renderContent}
                </Documents>
            </FeedLayout>
        )
    }
}

export class NewsFeed extends Component {
    constructor(props) {
        super(props)

        const { month, year, tags, page } = parse(props.location.search)

        this.state = {
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
    renderContent = renderContent.bind(this, NEWS)
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
                        <Tags type={NEWS}>
                            {props => (
                                <Dropdown
                                    value={tags}
                                    onChange={this.handleTagChange}
                                    options={convertTagsToOptions(props.tags)}
                                    placeholder="All tags"
                                />
                            )}
                        </Tags>
                    </FilterEntry>
                </FilterSet>
                <Documents {...feed.news(this.state)}>
                    {this.renderContent}
                </Documents>
            </FeedLayout>
        )
    }
}

export class EventFeed extends Component {
    constructor(props) {
        super(props)

        const { timeline, tags } = parse(location.search)

        this.state = {
            timeline: timeline === PAST ? PAST : UPCOMING,
            tags: new Set(sanitizeTags(tags)),
        }
    }
    handleTimelineChange = handleTimelineChange.bind(this)
    handleTagChange = handleTagChange.bind(this)
    handlePageChange = handlePageChange.bind(this)
    renderContent = renderContent.bind(this, EVENT)
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
                        <Tags type={EVENT}>
                            {props => (
                                <Dropdown
                                    value={new Set(tags)}
                                    onChange={this.handleTagChange}
                                    options={convertTagsToOptions(props.tags)}
                                    placeholder="All tags"
                                />
                            )}
                        </Tags>
                    </FilterEntry>
                </FilterSet>
                <Documents {...feed.events({ tags, past: timeline === PAST })}>
                    {this.renderContent}
                </Documents>
            </FeedLayout>
        )
    }
}

// Components
function FeedLayout({ title, children }) {
    return (
        <ScrollToTop>
            <Page>
                <Header title={title} />
                <Content>
                    <Main>{children}</Main>
                </Content>
            </Page>
        </ScrollToTop>
    )
}

function FeedContent({
    loading,
    documents,
    page,
    totalPages,
    onPageChange,
    type,
}) {
    if (
        page === 1 &&
        totalPages > 1 &&
        documents &&
        documents.some(isFeaturedPost)
    ) {
        const featured = documents.find(isFeaturedPost)

        documents = documents.filter(post => featured !== post)

        documents.unshift(featured)
    }

    return (
        <Shim vertical>
            {loading ? (
                <Loading />
            ) : documents?.length === 0 ? (
                <Muted>{EMPTY_MESSAGES.get(type)}</Muted>
            ) : null}
            {documents && <EntrySet>{documents.map(renderEntry)}</EntrySet>}
            <Pagination
                active={page}
                onChange={onPageChange}
                total={totalPages}
            />
        </Shim>
    )
}

// Constants
const CURRENT_YEAR = new Date().getFullYear()
const EMPTY_MESSAGES = new Map([
    [BLOG, 'No blog match your criteria.'],
    [NEWS, 'No news post match your criteria.'],
    [EVENT, 'No event match your criteria.'],
])
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

// Utils
function renderEntry(post) {
    return <Entry key={post.uid} {...post} />
}
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
function renderContent(type, { loading, documents, total_pages }) {
    return (
        <FeedContent
            type={type}
            loading={loading}
            documents={documents}
            totalPages={total_pages}
            onPageChange={this.handlePageChange}
        />
    )
}
function convertTagsToOptions(tags) {
    return new Map(
        Array.from(tags)
            .sort()
            .map(tag => [tag, tag])
    )
}
function isFeaturedPost({ featured }) {
    return featured
}
