import React, { useMemo } from 'react'
import { Link } from '@reach/router'
import { feed } from 'prismic/params'
import { Content, Header, Main } from 'components/page'
import { Page } from 'layouts/pages'
import { Loading, Muted } from 'components/text'
import Shim from 'components/Shim'
import Pagination from 'components/pagination'
import EntrySet from './EntrySet'
import Entry, { SPAW } from './Entry'
import TagTitle from './TagTitle'
import { DropdownFromOptions as Dropdown } from 'components/controls'
import { ControlSet, Control } from 'components/form'
import { NEWS, EVENT, BLOG } from 'constants/prismic'
import { GRAY_LIGHTEST } from 'constants/colors'
import { useSearch, useTags } from 'prismic/hooks'
import { useSPAW } from 'prismic/hooks'
import useParams, {
    NumberParam,
    StringParam,
    PageParam,
    SetParam,
    BooleanParam,
} from 'hooks/params'
import { useLocation } from 'router/hooks'
import { FormattedMessage } from 'react-intl'
import { useMonths, useIntlMemo } from 'hooks/intl'
import { useFeedTexts } from 'constants/prismic'

export function BlogPostFeed({ navigate }) {
    const [params, stringify] = useParams({
        page: PageParam,
        year: NumberParam,
        month: StringParam,
        category: StringParam,
    })
    const changeHandler = useChangeHandlerFactory(navigate, stringify)
    const categoryOptions = useCategoryOptions()
    const monthsOptions = useMonthsOptions()

    return (
        <FeedLayout title="Blogs">
            <ControlSet horizontal>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.category}
                        onChange={changeHandler('category', 1)}
                        options={categoryOptions}
                        placeholder={categoryOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.year}
                        onChange={changeHandler('year', 1)}
                        options={YearOptions}
                        placeholder={YearOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.month}
                        onChange={changeHandler('month', 1)}
                        options={monthsOptions}
                        placeholder={monthsOptions.get()}
                    />
                </Control>
            </ControlSet>
            <FeedContent
                params={feed.blog(params)}
                type={BLOG}
                onPageChange={changeHandler('page')}
            />
        </FeedLayout>
    )
}

export function NewsFeed({ navigate }) {
    const [params, stringify] = useParams({
        page: PageParam,
        year: NumberParam,
        month: StringParam,
        tags: SetParam,
    })
    const changeHandler = useChangeHandlerFactory(navigate, stringify)
    const monthsOptions = useMonthsOptions()

    return (
        <FeedLayout title="Recent news">
            <ControlSet horizontal>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.year}
                        onChange={changeHandler('year', 1)}
                        options={YearOptions}
                        placeholder={YearOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.month}
                        onChange={changeHandler('month', 1)}
                        options={monthsOptions}
                        placeholder={monthsOptions.get()}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <TagsDropdown
                        type={NEWS}
                        value={params.tags}
                        onChange={changeHandler('tags', 1)}
                    />
                </Control>
            </ControlSet>
            <FeedContent
                type={NEWS}
                params={feed.news(params)}
                onPageChange={changeHandler('page')}
            />
        </FeedLayout>
    )
}

export function EventFeed({ navigate }) {
    const [params, stringify] = useParams({
        page: PageParam,
        past: BooleanParam,
        tags: SetParam,
    })
    const changeHandler = useChangeHandlerFactory(navigate, stringify)
    const timeLineOptions = useTimelineOptions()

    return (
        <FeedLayout title="Events">
            <ControlSet horizontal>
                <Control style={CONTROL_STYLE}>
                    <Dropdown
                        value={params.past}
                        onChange={changeHandler('past', 1)}
                        options={timeLineOptions}
                        placeholder={timeLineOptions.get(params.past)}
                    />
                </Control>
                <Control style={CONTROL_STYLE}>
                    <TagsDropdown
                        type={EVENT}
                        value={params.tags}
                        onChange={changeHandler('tags', 1)}
                    />
                </Control>
            </ControlSet>
            <FeedContent
                type={EVENT}
                params={feed.events(params)}
                onPageChange={changeHandler('page')}
            />
        </FeedLayout>
    )
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
function FeedContent({ params, type, onPageChange }) {
    const { location } = useLocation()
    const [data = {}, pending] = useSearch(params)
    const [spaw] = useSPAW()
    const { results = [], page, total_pages } = data
    let rearranged = results
    const itemType = useFeedTexts()

    if (page === 1 && rearranged.some(isFeaturedPost)) {
        const featured = rearranged.find(isFeaturedPost)

        rearranged = rearranged.filter(post => featured !== post)

        rearranged.unshift(featured)
    }

    return (
        <Shim vertical>
            {pending ? (
                <Loading />
            ) : results.length === 0 ? (
                <Muted>
                    <FormattedMessage
                        description="Layout feed/Feed"
                        defaultMessage="No {type} match your criteria. You can <link>reset your criteria</link> to find more articles."
                        values={{
                            type: itemType.get(type),
                            link: text => <Link to={location.pathname}>{text}</Link>
                        }}
                    />

                </Muted>
            ) : null}
            <EntrySet>
                {Boolean(spaw && type === NEWS) && <SPAW {...spaw.data}></SPAW>}
                {rearranged.map(post => (
                    <Entry key={post.uid} {...post} />
                ))}
            </EntrySet>
            <Pagination
                active={page}
                onChange={onPageChange}
                total={total_pages}
            />
        </Shim>
    )
}
function TagsDropdown({ type, value, onChange }) {
    const [tags] = useTags(type)
    const options = useMemo(
        () =>
            new Map(
                Array.from(tags || [], tag => [tag, <TagTitle value={tag} />])
            ),
        [tags]
    )

    return (
        <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            placeholder="All tags"
        />
    )
}

// Constants
const CURRENT_YEAR = new Date().getFullYear()

const YearOptions = new Map([
    [undefined, 'All years'],
    ...Array(CURRENT_YEAR - 2012) // We are are going back to 2013!
        .fill(CURRENT_YEAR)
        .map((value, index) => value - index)
        .map(year => [year, String(year)]),
])

function useMonthsOptions() {
    const month = useMonths();
    return useIntlMemo((intl) => new Map([
        [undefined, intl.formatMessage({
            defaultMessage: 'All months',
            description: 'Layout feed/Feed',
        })],
        ['january', month[0]],
        ['february', month[1]],
        ['march', month[2]],
        ['april', month[3]],
        ['may', month[4]],
        ['june', month[5]],
        ['july', month[6]],
        ['august', month[7]],
        ['september', month[8]],
        ['october', month[9]],
        ['november', month[10]],
        ['december', month[11]],
    ]))
}

function useTimelineOptions() {
    return useIntlMemo((intl) => new Map([
        [false, intl.formatMessage({
            defaultMessage: 'Upcoming events',
            description: 'Layout feed/Feed',
        })],
        [true, intl.formatMessage({
            defaultMessage: 'Past events',
            description: 'Layout feed/Feed',
        })],
    ]))
}

function useCategoryOptions() {
    return useIntlMemo((intl) => new Map([
        ['forecaster blog', intl.formatMessage({
            defaultMessage: 'Forecaster blog',
            description: 'Layout feed/Feed',
        })],
        ['north-rockies', intl.formatMessage({
            defaultMessage: 'North Rockies',
            description: 'Layout feed/Feed',
        })],
        ['south-rockies', intl.formatMessage({
            defaultMessage: 'South Rockies',
            description: 'Layout feed/Feed',
        })],
        ['yukon', intl.formatMessage({
            defaultMessage: 'Yukon',
            description: 'Layout feed/Feed',
        })],
        ['undefined', intl.formatMessage({
            defaultMessage: 'All categories',
            description: 'Layout feed/Feed',
        })],
    ]))
}

// Utils
function isFeaturedPost({ tags }) {
    return tags.includes('featured')
}

// That super awesome function could be moved to "hooks/params" to generate handlers...
// But need some experience with it to know exactly what these handlers should do
function useChangeHandlerFactory(navigate, stringify) {
    return function (key, page) {
        return function (value) {
            return navigate(stringify({ page, [key]: value }))
        }
    }
}

// Styles
const CONTROL_STYLE = {
    borderBottom: '2px solid ' + GRAY_LIGHTEST,
    margin: 0,
    padding: '0.5em',
}
