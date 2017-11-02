import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import { compose, withProps, withHandlers } from 'recompose'
import {
    FilterSet,
    Feed as Base,
    BlogPost,
    NewsPost,
    EventPost,
} from 'containers/feed'
import { Page, Content, Header, Main } from 'components/page'
import { valueHandlerFactory, arrayValueHandlerFactory } from 'utils/router'
import { withRouter } from 'react-router-dom'
import { parse } from 'utils/search'
import { NEWS, BLOG, EVENT } from 'selectors/prismic/feed'

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

function toSet(tags = []) {
    if (typeof tags === 'string') {
        tags = [tags]
    }

    return new Set(tags)
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

function blogs() {
    return <Feed type={BLOG} title="Blogs" />
}

Blogs.propTypes = {
    match: PropTypes.object.isRequired,
}

export function Blogs({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/:uid`} component={BlogPost} />
            <Route path={path} render={blogs} />
        </Switch>
    )
}

function news() {
    return <Feed type={NEWS} title="Recent news" />
}

News.propTypes = {
    match: PropTypes.object.isRequired,
}

export function News({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/:uid`} component={NewsPost} />
            <Route path={path} render={news} />
        </Switch>
    )
}

function events(props) {
    const search = parse(props.location.search)

    if ('timeline' in search) {
        return <Feed type={EVENT} title="Events" />
    }

    const location = {
        ...props.location,
        search: '?timeline=upcoming',
    }

    return <Redirect to={location} />
}

Events.propTypes = {
    match: PropTypes.object.isRequired,
}

export function Events({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/:uid`} component={EventPost} />
            <Route path={path} render={events} />
        </Switch>
    )
}
