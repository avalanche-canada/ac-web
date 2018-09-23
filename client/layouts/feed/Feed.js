import React, { PureComponent } from 'react'
import { Documents, Tags } from 'prismic/containers'
import { feed } from 'prismic/params'
import { Page, Content, Header, Main } from 'components/page'
import { stringify } from 'utils/search'
import { Loading, Muted } from 'components/text'
import Shim from 'components/Shim'
import Pagination from 'components/pagination'
import { EntrySet, Entry } from 'components/feed'
import { FilterSet, FilterEntry } from 'components/filter'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import { NEWS, EVENT, BLOG } from 'constants/prismic'

// FIXME: Do not parse params, just use them from this.props.location.search

export class NorthRockiesBlogFeed extends PureComponent {
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

export class BlogPostFeed extends PureComponent {
    state = this.parseParams(this.props.location.search)
    parseParams(search) {
        const params = new URLSearchParams(search)

        return {
            page: params.has('page') ? Number(params.get('page')) : 1,
            year: params.has('year') ? Number(params.get('year')) : undefined,
            month: params.get('month'),
            category: params.get('category'),
        }
    }
    componentDidUpdate({ location }) {
        if (location.search !== this.props.location.search) {
            this.setState(this.parseParams(this.props.location.search))
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

export class NewsFeed extends PureComponent {
    state = this.parseParams(this.props.location.search)
    parseParams(search) {
        const params = new URLSearchParams(search)

        return {
            page: params.has('page') ? Number(params.get('page')) : 1,
            year: params.has('year') ? Number(params.get('year')) : undefined,
            month: params.get('month'),
            tags: params.has('tags')
                ? new Set(sanitizeTags(params.getAll('tags')))
                : new Set(),
        }
    }
    componentDidUpdate({ location }) {
        if (location.search !== this.props.location.search) {
            this.setState(this.parseParams(this.props.location.search))
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

export class EventFeed extends PureComponent {
    state = this.parseParams(this.props.location.search)
    parseParams(search) {
        const params = new URLSearchParams(search)

        return {
            page: params.has('page') ? Number(params.get('page')) : 1,
            timeline: params.has('timeline')
                ? params.get('timeline') === PAST
                    ? PAST
                    : UPCOMING
                : UPCOMING,
            tags: params.has('tags')
                ? new Set(sanitizeTags(params.getAll('tags')))
                : new Set(),
        }
    }
    componentDidUpdate({ location }) {
        if (location.search !== this.props.location.search) {
            this.setState(this.parseParams(this.props.location.search))
        }
    }
    handleTimelineChange = handleTimelineChange.bind(this)
    handleTagChange = handleTagChange.bind(this)
    handlePageChange = handlePageChange.bind(this)
    renderContent = renderContent.bind(this, EVENT)
    render() {
        const { timeline, tags, page } = this.state

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
                <Documents
                    {...feed.events({ tags, past: timeline === PAST, page })}>
                    {this.renderContent}
                </Documents>
            </FeedLayout>
        )
    }
}

// Components
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

function FeedContent({
    loading,
    documents,
    page,
    totalPages,
    onPageChange,
    type,
}) {
    if (page === 1 && documents && documents.some(isFeaturedPost)) {
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
    const search = stringify({
        ...this.state,
        page: page > 1 ? page : undefined,
    })

    this.props.navigate(search)
}
function sanitizeTags(tags) {
    return typeof tags === 'string' ? [tags] : tags
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
function renderContent(type, { loading, documents, page, total_pages }) {
    return (
        <FeedContent
            type={type}
            loading={loading}
            documents={documents}
            page={page}
            totalPages={total_pages}
            onPageChange={this.handlePageChange}
        />
    )
}
function convertTagsToOptions(tags) {
    return new Map(Array.from(tags).map(tag => [tag, tag]))
}
function isFeaturedPost({ featured }) {
    return featured
}
