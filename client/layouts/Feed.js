import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'
import { FilterSet, Feed as Base } from '~/containers/feed'
import { Page, Content, Header, Main } from '~/components/page'
import { valueHandlerFactory, arrayValueHandlerFactory } from '~/utils/router'
import { withRouter } from 'react-router-dom'
import { parse } from '~/utils/search'
import { replace } from '~/utils/router'
import { NEWS, BLOG, EVENT } from '~/selectors/prismic/feed'

Layout.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Layout({ type, title, ...query }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <FilterSet type={type} {...query} />
                    <Base type={type} {...query} />
                </Main>
            </Content>
        </Page>
    )
}

function toSet(tags) {
    if (Array.isArray(tags)) {
        return new Set(tags)
    }

    if (typeof tags === 'string') {
        return new Set([tags])
    }

    return new Set()
}

const Feed = compose(
    withRouter,
    withProps(({ location }) => {
        const { year, month, category, tags, timeline } = parse(location.search)

        return {
            year: year ? Number(year) : year,
            month,
            category,
            timeline,
            tags: toSet(tags),
        }
    }),
    withHandlers({
        onYearChange: valueHandlerFactory('year'),
        onMonthChange: valueHandlerFactory('month'),
        onCategoryChange: valueHandlerFactory('category'),
        onTimelineChange: valueHandlerFactory('timeline'),
        onTagChange: arrayValueHandlerFactory('tags'),
    })
)(Layout)

export default Feed

export const NewsFeed = withProps({
    type: NEWS,
    title: 'Recent news',
})(Feed)

export const BlogFeed = withProps({
    type: BLOG,
    title: 'Blogs',
})(Feed)

export const EventFeed = compose(
    withProps({
        type: EVENT,
        title: 'Events',
    }),
    lifecycle({
        componentDidMount() {
            const search = parse(this.props.location.search)

            if ('timeline' in search) {
                return
            }

            search.timeline = 'upcoming'

            replace(this.props, { search })
        },
    })
)(Feed)
